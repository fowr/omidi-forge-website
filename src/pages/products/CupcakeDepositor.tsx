import { ArrowLeft, Download, Mail, Phone, Zap, Droplets, Timer, Gauge, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cupcakeDepositorImage from "@/assets/cupcake-depositor.jpg";

const CupcakeDepositor = () => {
  const specifications = [
    { label: "Production Rate", value: "2000-8000 pcs/hr", icon: Gauge },
    { label: "Deposit Weight", value: "10-200g", icon: Droplets },
    { label: "Cup Diameter", value: "50-100mm", icon: Gauge },
    { label: "Hopper Capacity", value: "50-200L", icon: Droplets },
    { label: "Power Rating", value: "2-5 kW", icon: Zap },
    { label: "Accuracy", value: "±1-2%", icon: Timer }
  ];

  const features = [
    "Pneumatic depositing system",
    "Variable speed control",
    "Quick-change nozzle system",
    "Touch screen control panel",
    "Automatic batter mixing",
    "Adjustable portion control",
    "Easy cleaning design",
    "Stainless steel construction",
    "Recipe memory storage",
    "Low noise operation"
  ];

  const applications = [
    "Standard cupcakes",
    "Mini cupcakes and muffins",
    "Filled cupcakes",
    "Layer cake bases",
    "Specialty desserts",
    "Custom portion products"
  ];

  const machineGallery = [
    {
      image: cupcakeDepositorImage,
      title: "Cupcake Depositor - Main Unit",
      description: "High-precision pneumatic depositing system for consistent portioning"
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      title: "Digital Control Interface",
      description: "Touch screen control panel with recipe storage and portion adjustment"
    },
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      title: "Depositing Mechanism",
      description: "Advanced nozzle system for multiple cupcake sizes and patterns"
    },
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      title: "Production Setup",
      description: "Complete production line integration with conveyor system"
    }
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
              <span className="text-foreground">Cupcake Depositor</span>
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
                    Popular Choice
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Automated
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Cupcake Depositor
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Precision automated cupcake batter depositing system with adjustable portion 
                  control and high-speed operation. Perfect for consistent, professional cupcake 
                  production with minimal waste.
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
                  <Button variant="outline" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Expert
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={cupcakeDepositorImage} 
                  alt="Cupcake Depositor Machine"
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

        {/* Video Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Precision Cupcake Production
              </h2>
              <p className="text-lg text-muted-foreground">
                Watch our cupcake depositor deliver consistent results at high speeds
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={cupcakeDepositorImage}
                  alt="Cupcake Depositor Video Preview"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="bg-primary/90 rounded-full p-6 group-hover:bg-primary transition-colors">
                    <Play className="h-12 w-12 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Cupcake Depositing Process</h3>
                  <p className="text-sm opacity-90">4:20 minutes • High-speed production</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Machine Gallery */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Machine Gallery
              </h2>
              <p className="text-lg text-muted-foreground">
                Detailed views of our cupcake depositor components and operation
              </p>
            </div>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {machineGallery.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <Card className="bg-gradient-card border-border">
                      <CardContent className="p-0">
                        <div className="relative aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
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

        {/* Features & Applications */}
        <section className="py-16">
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
              Boost Your Cupcake Production
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience precision, consistency, and efficiency with our advanced 
              cupcake depositor. Perfect for bakeries of all sizes.
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
              <div>
                <div className="text-2xl font-bold text-primary mb-1">±1%</div>
                <div className="text-sm text-muted-foreground">Portion Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">8000</div>
                <div className="text-sm text-muted-foreground">Pieces per Hour</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">Easy</div>
                <div className="text-sm text-muted-foreground">Operation & Cleaning</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CupcakeDepositor;