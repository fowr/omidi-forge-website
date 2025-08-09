import { useState, useEffect } from "react";
import { ArrowRight, Download, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  primary_image?: {
    file_url: string;
    alt_text: string | null;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch products with category and primary media
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(name, slug),
          product_media!inner(file_url, alt_text, is_primary)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Process products to get primary images
      const processedProducts = (productsData || []).map(product => {
        // Find primary image or use first image
        const primaryImage = product.product_media?.find((media: any) => media.is_primary) || 
                           product.product_media?.[0];
        
        return {
          ...product,
          primary_image: primaryImage ? {
            file_url: primaryImage.file_url,
            alt_text: primaryImage.alt_text
          } : undefined
        };
      });

      setProducts(processedProducts);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
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

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.short_description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                            product.category?.slug === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price_low':
          return (a.price || 0) - (b.price || 0);
        case 'price_high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-lg text-muted-foreground">Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Production Lines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of industrial food processing high capacity Production Line designed for 
            efficiency, precision, and reliability in commercial production.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search production lines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group bg-card border-border hover:shadow-elegant transition-smooth overflow-hidden">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={product.primary_image?.file_url || '/placeholder.svg'}
                      alt={product.primary_image?.alt_text || product.name}
                      className="w-full h-full  group-hover:scale-105 transition-smooth"
                    />
                    {/* Badges overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {product.is_featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                      {product.is_bestseller && (
                        <Badge className="bg-green-600 text-white">
                          Bestseller
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category?.name || 'Uncategorized'}
                      </Badge>
                      {product.automation_level && (
                        <Badge variant="outline" className="text-xs">
                          {product.automation_level.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {product.short_description || product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Price */}
                      {product.price && (
                        <div className="text-lg font-semibold text-primary">
                          {formatPrice(product.price, product.price_currency, product.price_type)}
                        </div>
                      )}

                      {/* Tags/Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.tags?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag.replace('-', ' ')}
                          </Badge>
                        ))}
                        {product.tags && product.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Key Specs */}
                      {/* {(product.power_consumption?.value || product.production_capacity?.value) && (
                        <div className="text-sm text-muted-foreground space-y-1">
                          {product.power_consumption?.value && (
                            <div>Power: {product.power_consumption.value} {product.power_consumption.unit || 'kW'}</div>
                          )}
                          {product.production_capacity?.value && (
                            <div>Capacity: {product.production_capacity.value} {product.production_capacity.unit}</div>
                          )}
                        </div>
                      )} */}
                      
                      <div className="flex gap-3">
                        <Button asChild className="bg-gradient-primary hover:shadow-glow flex-1">
                          <Link to={`/products/${product.slug}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      {products.some(p => p.is_featured) && (
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Our most popular and highly recommended machinery
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(product => product.is_featured)
                .slice(0, 6)
                .map((product) => (
                <Card key={`featured-${product.id}`} className="group bg-card border-border hover:shadow-elegant transition-smooth overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.primary_image?.file_url || '/placeholder.svg'}
                      alt={product.primary_image?.alt_text || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-smooth">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {product.short_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-gradient-primary hover:shadow-glow">
                      <Link to={`/products/${product.slug}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our engineering team can design and manufacture custom machinery 
            tailored to your specific production requirements and workflow needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Request Custom Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;