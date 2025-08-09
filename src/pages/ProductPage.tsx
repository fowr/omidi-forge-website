import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Phone, Zap, Timer, Gauge, Play, Package, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EnhancedComponentsSection } from "@/components/EnhancedComponentsSection";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number | null;
  price_currency: string;
  price_type: string;
  category_id: string;
  product_type: string;
  specifications: Record<string, any>;
  automation_level: string;
  tags: string[];
  weight: number | null;
  dimensions: Record<string, any>;
  power_consumption: Record<string, any>;
  production_capacity: Record<string, any>;
  lead_time_days: number | null;
  warranty_months: number;
  certification_standards: string[];
  status: string;
  is_featured: boolean;
  is_bestseller: boolean;
  category?: {
    name: string;
    slug: string;
  };
}

interface ProductMedia {
  id: string;
  file_url: string;
  file_name: string;
  media_type: 'image' | 'video' | 'document';
  title: string | null;
  alt_text: string | null;
  is_primary: boolean;
}

interface ProductComponent {
  id: string;
  quantity: number;
  is_optional: boolean;
  notes: string | null;
  component: {
    id: string;
    name: string;
    description: string;
    component_type: string;
    specifications: Record<string, any>;
    manufacturer: string;
    model_number: string;
  };
}

const DynamicProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [components, setComponents] = useState<ProductComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProductData();
    }
  }, [slug]);

  const fetchProductData = async () => {
    try {
      setLoading(true);

      // Fetch product with category
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(name, slug)
        `)
        .eq('slug', slug)
        .eq('status', 'active')
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Fetch media
      const { data: mediaData, error: mediaError } = await supabase
        .from('product_media')
        .select('*')
        .eq('product_id', productData.id)
        .order('sort_order');

      if (mediaError) throw mediaError;
      setMedia(mediaData || []);

      // Fetch components
      const { data: componentsData, error: componentsError } = await supabase
        .from('product_components')
        .select(`
          *,
          component:components(*)
        `)
        .eq('product_id', productData.id)
        .order('sort_order');

      if (componentsError) throw componentsError;
      setComponents(componentsData || []);

    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number | null, currency: string, type: string) => {
    if (!price) return "Price on Request";
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formattedPrice = formatter.format(price);
    
    switch (type) {
      case 'starting_from':
        return `Starting from ${formattedPrice}`;
      case 'quote':
        return "Price on Request";
      default:
        return formattedPrice;
    }
  };

  const getSpecificationIcon = (key: string) => {
    const iconMap: Record<string, any> = {
      production_rate: Timer,
      capacity: Gauge,
      power: Zap,
      weight: Package,
      speed: Gauge,
      temperature: Gauge,
      pressure: Gauge,
      default: Wrench
    };
    
    const lowerKey = key.toLowerCase();
    for (const [iconKey, Icon] of Object.entries(iconMap)) {
      if (lowerKey.includes(iconKey)) {
        return Icon;
      }
    }
    return iconMap.default;
  };

  const renderSpecifications = () => {
    if (!product?.specifications || Object.keys(product.specifications).length === 0) {
      return null;
    }

    return Object.entries(product.specifications).map(([key, value]) => {
      const Icon = getSpecificationIcon(key);
      return {
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: String(value),
        icon: Icon
      };
    });
  };

  const primaryImage = media.find(m => m.is_primary && m.media_type === 'image') || 
                     media.find(m => m.media_type === 'image') ||
                     { file_url: '/placeholder-product.jpg', alt_text: product?.name };

  const imageGallery = media.filter(m => m.media_type === 'image');
  const videoMedia = media.find(m => m.media_type === 'video');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center py-20">
          <div className="text-muted-foreground">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
console.log(product)
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              {product.category && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Link 
                    to={`/products?category=${product.category.slug}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </>
              )}
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  {product.automation_level && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {product.automation_level.replace('_', ' ')}
                    </Badge>
                  )}
                  {product.is_featured && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Featured
                    </Badge>
                  )}
                  {product.is_bestseller && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Bestseller
                    </Badge>
                  )}
                  {product.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {product.name}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {product.short_description || product.description}
                </p>

                {product.price && (
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(product.price, product.price_currency, product.price_type)}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <Mail className="mr-2 h-5 w-5" />
                    Request Quote
                  </Button>
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Download className="mr-2 h-5 w-5" />
                    Download Specs
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={primaryImage.file_url} 
                  alt={primaryImage.alt_text || product.name}
                  className="w-full rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        {/* {renderSpecifications() && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderSpecifications()?.map((spec, index) => (
                  <Card key={index} className="bg-gradient-card border-border">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <spec.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {spec.label}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        {spec.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )} */}
        {/* Components & Description */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-8">
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="components" className="mt-8">
                <EnhancedComponentsSection 
                  components={components} 
                  productName={product.name} 
                />
              </TabsContent>
              
              <TabsContent value="certifications" className="mt-8">
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle>Certifications & Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.certification_standards && product.certification_standards.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {product.certification_standards.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No certification information available.</p>
                      )}
                      
                      {(product.warranty_months || product.lead_time_days) && (
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          {product.warranty_months && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Warranty</h4>
                              <p className="text-muted-foreground">{product.warranty_months} months</p>
                            </div>
                          )}
                          {product.lead_time_days && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Lead Time</h4>
                              <p className="text-muted-foreground">{product.lead_time_days} days</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Power Consumption & Production Capacity Tables */}
        {(product.power_consumption || product.production_capacity) && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Performance Data
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Power Consumption Table */}
                {product.power_consumption && Object.keys(product.power_consumption).length > 0 && (
                  <Card className="bg-gradient-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-primary" />
                        Power Consumption
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parameter</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(product.power_consumption).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </TableCell>
                              <TableCell>{String(value)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Production Capacity Table */}
                {product.production_capacity && Object.keys(product.production_capacity).length > 0 && (
                  <Card className="bg-gradient-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gauge className="mr-2 h-5 w-5 text-primary" />
                        Production Capacity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parameter</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(product.production_capacity).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </TableCell>
                              <TableCell>{String(value)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Additional Technical Data */}
              {(product.dimensions || product.weight) && (
                <Card className="bg-gradient-card border-border mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-5 w-5 text-primary" />
                      Physical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.weight && (
                          <TableRow>
                            <TableCell className="font-medium">Weight</TableCell>
                            <TableCell>{product.weight} kg</TableCell>
                          </TableRow>
                        )}
                        {product.dimensions && Object.entries(product.dimensions).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">
                              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </TableCell>
                            <TableCell>{String(value)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Video Section */}
        {videoMedia && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  See It In Action
                </h2>
                <p className="text-lg text-muted-foreground">
                  Watch our {product.name} in operation
                </p>
              </div>
              
              <div className="relative max-w-4xl mx-auto">
                <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden group cursor-pointer">
                  <video 
                    src={videoMedia.file_url}
                    poster={primaryImage.file_url}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Image Gallery */}
        {imageGallery.length > 1 && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Product Gallery
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore different views and details of the {product.name}
                </p>
              </div>
              
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {imageGallery.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                      <Card className="bg-gradient-card border-border">
                        <CardContent className="p-0">
                          <div className="relative aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={item.file_url}
                              alt={item.alt_text || item.title || product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          {(item.title || item.alt_text) && (
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {item.title || item.alt_text}
                              </h3>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </section>
        )}


        {/* CTA Section */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in this {product.name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact our experts for detailed specifications, pricing, and custom configurations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8">
                <Mail className="mr-2 h-5 w-5" />
                Get Custom Quote
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>

            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {product.warranty_months && (
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{product.warranty_months}</div>
                  <div className="text-sm text-muted-foreground">Months Warranty</div>
                </div>
              )}
              {product.lead_time_days && (
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{product.lead_time_days}</div>
                  <div className="text-sm text-muted-foreground">Days Lead Time</div>
                </div>
              )}
              {product.automation_level && (
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{product.automation_level.replace('_', ' ')}</div>
                  <div className="text-sm text-muted-foreground">Automation Level</div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicProductPage;