import { Shield, Zap, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "ISO certified manufacturing with rigorous quality control processes ensuring reliable, durable equipment."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology and continuous R&D to deliver the most advanced bakery solutions."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with comprehensive support and maintenance services."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced engineers and technicians dedicated to delivering exceptional results."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Omidi Machinery Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Established in 1988, Omidi Machinery Industries has grown to serve 800 manufacturing units across the country 
            and export machinery and production lines to over 68 countries worldwide. We specialize in designing and manufacturing 
            machinery for the food industry, including fully and semi-automatic production lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Our Expertise
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Since inception, we have been actively engaged in the production of machines for various 
                sectors of the food industry. Our main activities include:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production lines for various types of filled cookies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production lines for cupcakes, pie cakes, and fun cakes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production lines for layer cakes and Swiss rolls</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production line for Chocopies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production line for chocolate and nut bars</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Complete production lines for bread and filled bread</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Design and manufacturing of various cooling spirals</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Design and manufacturing of various types of tunnel ovens</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Design and manufacturing of mixers, pre-mixers, and vertical mixers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Design and manufacturing of automation systems for production lines</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">36+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">800+</div>
                <div className="text-sm text-muted-foreground">Manufacturing Units</div>
              </div>
              <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">68+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;