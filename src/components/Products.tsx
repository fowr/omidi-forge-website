import { useState, useEffect } from "react";
import { ArrowRight, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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

interface FeaturedProductsProps {
  limit?: number;
  showHeader?: boolean;
  showViewAllButton?: boolean;
  featuredOnly?: boolean;
}

const FeaturedProducts = ({ 
  limit = 6, 
  showHeader = true, 
  showViewAllButton = true,
  featuredOnly = false
}: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(name, slug),
          product_media!inner(file_url, alt_text, is_primary)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      // If featuredOnly is true, only fetch featured products
      if (featuredOnly) {
        query = query.eq('is_featured', true);
      }

      const { data: productsData, error: productsError } = await query.limit(limit);

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
      console.error('Error fetching products:', error);
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

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg text-muted-foreground">Loading products...</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {featuredOnly ? "Featured Products" : "Our Products"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of industrial food processing machinery designed for 
              efficiency, precision, and reliability in commercial production.
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group bg-card border-border hover:shadow-elegant transition-smooth overflow-hidden">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={product.primary_image?.file_url || '/placeholder.svg'}
                  alt={product.primary_image?.alt_text || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
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

        {showViewAllButton && (
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;