import { ArrowLeft, Download, Mail, Phone, Zap, Cookie, Timer, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cookieDepositorImage from "@/assets/cookie-depositor.jpg";

const CookieDepositor = () => {
  const specifications = [
    { label: "Production Rate", value: "1000-5000 pcs/hr", icon: Timer },
    { label: "Cookie Weight", value: "5-100g", icon: Gauge },
    { label: "Deposit Shapes", value: "20+ patterns", icon: Cookie },
    { label: "Hopper Volume", value: "30-150L", icon: Gauge },
    { label: "Power Rating", value: "2-8 kW", icon: Zap },
    { label: "Accuracy", value: "±1.5%", icon: Gauge }
  ];

  const features = [
    "Multiple depositing patterns",
    "Quick-change nozzle system",
    "Variable speed control",
    "Portion weight adjustment",
    "Easy recipe programming",
    "Stainless steel hopper",
    "Tool-free cleaning",
    "Servo-driven precision",
    "Touch screen control",
    "Compact footprint design"
  ];

  const applications = [
    "Drop cookies and biscuits",
    "Wire-cut cookies",
    "Shaped cookie products",
    "Filled cookies",
    "Decorated cookies",
    "Specialty bakery items"
  ];

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
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">Cookie Depositor</span>
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
                    Versatile
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    User Friendly
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Cookie Depositor
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Precision cookie dough depositing machine with customizable shapes and 
                  consistent portion control. Ideal for producing a wide variety of cookie 
                  types with professional quality and efficiency.
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
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Expert
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={cookieDepositorImage} 
                  alt="Cookie Depositor Machine"
                  className="w-full h-96 object-cover rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Technical Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specifications.map((spec, index) => (
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

        {/* Features & Applications */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Features */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Applications */}
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applications.map((application, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{application}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Versatile Cookie Production
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              From simple drop cookies to complex shaped products, our depositor 
              handles it all with precision and reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8">
                <Mail className="mr-2 h-5 w-5" />
                Get Custom Quote
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="mr-2 h-5 w-5" />
                See It In Action
              </Button>
            </div>

            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-muted-foreground">Cookie Patterns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">5000</div>
                <div className="text-sm text-muted-foreground">Pieces per Hour</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">Quick</div>
                <div className="text-sm text-muted-foreground">Setup & Changeover</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CookieDepositor;