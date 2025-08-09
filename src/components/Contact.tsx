import { Mail, Phone, MapPin, Send, Clock, Headphones, Youtube, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to revolutionize your bakery operations? Our team of experts is here to 
            help you find the perfect equipment solution for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Phone Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Speak directly with our technical experts
                </p>
                <p className="text-lg font-semibold text-foreground">+98 911 143 8779</p>
                <p className="text-sm text-muted-foreground">Sat-Thu: 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Send us your detailed requirements
                </p>
                <p className="text-lg font-semibold text-foreground">info@omidi.com</p>
                <p className="text-sm text-muted-foreground">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Visit Our Facility</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  See our equipment in action
                </p>
                <p className="text-sm text-foreground">
                  3rd KM of Langroud<br />
                  Lahijan , OMIDI Industrial Machinery
                </p>
                <p className="text-sm text-muted-foreground">By appointment only</p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div className="space-y-4 pt-6">
              <h3 className="font-semibold text-foreground">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.youtube.com/@OMIDI.Machinery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-card rounded-lg border-border hover:shadow-glow transition-smooth"
                >
                  <Youtube className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://instagram.com/omidi.machinery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-card rounded-lg border-border hover:shadow-glow transition-smooth"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://wa.me/989111438779" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-card rounded-lg border-border hover:shadow-glow transition-smooth"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>

            {/* Additional Services */}
            <div className="space-y-4 pt-6">
              <h3 className="font-semibold text-foreground">Additional Services</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Headphones className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">24/7 Emergency Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">On-site Installation Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Training & Documentation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Request a Quote</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you with a detailed proposal.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company *</label>
                    <Input 
                      placeholder="Enter company name" 
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input 
                      placeholder="Enter phone number" 
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Equipment Interest</label>
                  <Input 
                    placeholder="e.g., Tunnel Oven, Cupcake Depositor" 
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Details *</label>
                  <Textarea 
                    placeholder="Please describe your project requirements, production capacity needs, timeline, and any specific features you're looking for..."
                    rows={6}
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6 group"
                >
                  Send Quote Request
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy. 
                  We'll only use your information to provide you with relevant product information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;