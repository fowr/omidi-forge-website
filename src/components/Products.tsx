import { ArrowRight, Zap, Settings, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import tunnelOvenImage from "@/assets/tunnel-oven-hero.jpg";
import cupcakeDepositorImage from "@/assets/cupcake-depositor.jpg";
import layerCakeMachineImage from "@/assets/layer-cake-machine.jpg";
import cookieDepositorImage from "@/assets/cookie-depositor.jpg";

const Products = () => {
  const products = [
    {
      id: "tunnel-oven",
      name: "Tunnel Oven",
      description: "Various types of tunnel ovens for continuous baking operations with precise temperature control and energy efficiency.",
      image: tunnelOvenImage,
      features: ["Continuous Operation", "Energy Efficient", "Digital Controls"],
      badges: ["Best Seller", "Industrial Grade"]
    },
    {
      id: "cupcake-depositor",
      name: "Cupcake Production Line",
      description: "Complete production lines for cupcakes, pie cakes, and fun cakes with automated depositing and baking systems.",
      image: cupcakeDepositorImage,
      features: ["Complete Line", "Automated", "High Capacity"],
      badges: ["Popular", "Full Production"]
    },
    {
      id: "layer-cake-machine",
      name: "Layer Cake & Swiss Roll Line",
      description: "Complete production lines for layer cakes and Swiss rolls with automatic layering and cream distribution systems.",
      image: layerCakeMachineImage,
      features: ["Multi-Layer", "Swiss Roll", "Automated Cream Distribution"],
      badges: ["Professional", "High Output"]
    },
    {
      id: "cookie-depositor",
      name: "Cookie Production Line",
      description: "Complete production lines for various types of filled cookies with precision depositing and consistent quality control.",
      image: cookieDepositorImage,
      features: ["Filled Cookies", "Consistent Quality", "Various Types"],
      badges: ["Versatile", "Complete Solution"]
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of industrial bakery equipment, 
            designed to meet the demanding needs of modern commercial baking operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="bg-gradient-card border-border hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/90 text-primary-foreground">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Settings className="h-4 w-4" />
                    <span>Customizable</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Certified</span>
                  </div>
                </div>
                
                <Link to={`/products/${product.id}`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 group"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;