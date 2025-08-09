import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Youtube, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Omidi</h3>
            <p className="text-muted-foreground text-sm">
              Leading manufacturer of industrial bakery equipment, providing innovative solutions for commercial baking operations worldwide.
            </p>
            <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
              Request Catalog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Products
                </Link>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <Link 
                  to="/news" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/products/tunnel-oven" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Tunnel Ovens
                </Link>
              </li>
              <li>
                <Link 
                  to="/products/cupcake-depositor" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Cupcake Depositors
                </Link>
              </li>
              <li>
                <Link 
                  to="/products/layer-cake-machine" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Layer Cake Machines
                </Link>
              </li>
              <li>
                <Link 
                  to="/products/cookie-depositor" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Cookie Depositors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+98 911 143 8779</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@omidico.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                3rd KM of Langroud<br />
                Lahijan , OMIDI Industrial Machinery
                </span>
              </div>
              <div className="flex space-x-3 mt-4">
                <a 
                  href="https://www.youtube.com/@OMIDI.Machinery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-smooth"
                >
                  <Youtube className="h-4 w-4 text-primary" />
                </a>
                <a 
                  href="https://instagram.com/omidi.machinery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-smooth"
                >
                  <Instagram className="h-4 w-4 text-primary" />
                </a>
                <a 
                  href="https://wa.me/989111438779" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-smooth"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Omidi Industrial Equipment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;