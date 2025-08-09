import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Phone, Package, Wrench, Factory, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Component {
  id: string;
  name: string;
  description: string;
  component_type: string;
  specifications: Record<string, any>;
  manufacturer: string;
  model_number: string;
  is_active: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
  updated_at: string;
}

interface ProductUsingComponent {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  quantity: number;
  is_optional: boolean;
  primary_image?: {
    file_url: string;
    alt_text: string | null;
  };
}

const ComponentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [component, setComponent] = useState<Component | null>(null);
  const [productsUsingComponent, setProductsUsingComponent] = useState<ProductUsingComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchComponentData();
    }
  }, [id]);

  const fetchComponentData = async () => {
    try {
      setLoading(true);

      // Fetch component
      const { data: componentData, error: componentError } = await supabase
        .from('components')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (componentError) throw componentError;
      setComponent(componentData);

      // Fetch products that use this component
      const { data: productComponentsData, error: productComponentsError } = await supabase
        .from('product_components')
        .select(`
          quantity,
          is_optional,
          product:products(
            id,
            name,
            slug,
            short_description,
            product_media(file_url, alt_text, is_primary)
          )
        `)
        .eq('component_id', id);

      if (productComponentsError) throw productComponentsError;

      // Process products with primary images
      const processedProducts = (productComponentsData || []).map(pc => {
        const product = pc.product;
        const primaryImage = product.product_media?.find((media: any) => media.is_primary) || 
                           product.product_media?.[0];
        
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          short_description: product.short_description,
          quantity: pc.quantity,
          is_optional: pc.is_optional,
          primary_image: primaryImage ? {
            file_url: primaryImage.file_url,
            alt_text: primaryImage.alt_text
          } : undefined
        };
      });

      setProductsUsingComponent(processedProducts);

    } catch (error) {
      console.error('Error fetching component:', error);
      toast({
        title: "Error",
        description: "Failed to load component information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSpecificationIcon = (key: string) => {
    const iconMap: Record<string, any> = {
      power: Settings,
      capacity: Package,
      speed: Settings,
      temperature: Settings,
      pressure: Settings,
      weight: Package,
      dimensions: Package,
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
    if (!component?.specifications || Object.keys(component.specifications).length === 0) {
      return null;
    }

    return Object.entries(component.specifications).map(([key, value]) => {
      const Icon = getSpecificationIcon(key);
      return {
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: String(value),
        icon: Icon
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center py-20">
          <div className="text-muted-foreground">Loading component...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!component) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Component Not Found</h1>
            <p className="text-muted-foreground mb-4">The component you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/components">Browse Components</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              <Link to="/components" className="text-muted-foreground hover:text-primary transition-colors">
                Components
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{component.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <Link to="/components" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  {component.component_type && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {component.component_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  )}
                  {component.manufacturer && (
                    <Badge variant="outline" className="text-xs">
                      {component.manufacturer}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {component.name}
                </h1>
                
                {component.model_number && (
                  <div className="text-lg text-muted-foreground">
                    <span className="font-medium">Model:</span> {component.model_number}
                  </div>
                )}
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {component.description}
                </p>

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
                  src={component.image_url || '/placeholder.svg'} 
                  alt={component.image_alt || component.name}
                  className="w-full rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturer Info */}
        {component.manufacturer && (
          <section className="pt-16 pb-0 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="mr-2 h-5 w-5 text-primary" />
                    Manufacturer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Manufacturer</h3>
                      <p className="text-muted-foreground">{component.manufacturer}</p>
                    </div>
                    {component.model_number && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Model Number</h3>
                        <p className="text-muted-foreground">{component.model_number}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Specifications 
        {renderSpecifications() && (
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
        )}
        */}
        
        {/* Detailed Specifications Table */}
        {component.specifications && Object.keys(component.specifications).length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Detailed Specifications
              </h2>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(component.specifications).map(([key, value]) => (
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
            </div>
          </section>
        )}

        {/* Products Using This Component */}
        {productsUsingComponent.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Used In These Products
                </h2>
                <p className="text-lg text-muted-foreground">
                  This component is featured in the following production lines
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsUsingComponent.map((product) => (
                  <Card key={product.id} className="group bg-card border-border hover:shadow-elegant transition-smooth overflow-hidden">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={product.primary_image?.file_url || '/placeholder.svg'}
                        alt={product.primary_image?.alt_text || product.name}
                        className="w-full h-full group-hover:scale-105 transition-smooth"
                      />
                      {product.is_optional && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-yellow-500/90 text-white">
                            Optional
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-smooth">
                        {product.name}
                      </CardTitle>
                      <p className="text-muted-foreground line-clamp-2 mt-2">
                        {product.short_description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Quantity:</span> {product.quantity}
                        </div>
                        
                        <Button asChild className="w-full bg-gradient-primary hover:shadow-glow">
                          <Link to={`/products/${product.slug}`}>
                            View Product Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in this {component.name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact our technical experts for detailed specifications, compatibility information, and pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8">
                <Mail className="mr-2 h-5 w-5" />
                Get Component Quote
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="mr-2 h-5 w-5" />
                Technical Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComponentPage;