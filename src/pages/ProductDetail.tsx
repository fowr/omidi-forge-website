import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Phone, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/useProduct";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link to="/products">
              <Button variant="outline">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specifications = product.specifications as any[] || [];
  const features = product.features as string[] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {product.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {product.title}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <Mail className="mr-2 h-5 w-5" />
                    Request Quote
                  </Button>
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Download className="mr-2 h-5 w-5" />
                    Download Guide
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={product.image_url || "/placeholder.svg"} 
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg shadow-elegant"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        {specifications.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specifications.map((spec: any, index: number) => (
                  <Card key={index} className="bg-gradient-card border-border">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <Gauge className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {spec.label || spec.name}
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

        {/* Features */}
        {features.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="bg-gradient-card border-border max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground text-center">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;