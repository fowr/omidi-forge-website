import { Award, MapPin, Play, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import farhadImg from "@/assets/farhad.png";
import shabnamImg from "@/assets/sh.png";
import karenImg from "@/assets/karen.png";

const managers = [
  {
    name: "Farhad J. Omidi",
    title: "Founder & CEO",
    description: "Mr. Farhad J. Omidi established Omidi Machinery in 1988, leading the company to become a pioneer in industrial food machinery manufacturing.",
    image: farhadImg,
  },
  {
    name: "Shabnam B. Omidi",
    title: "Commercial Manager",
    description: "Mrs. Shabnam B. Omidi oversees commercial operations, ensuring seamless client relations and business development.",
    image: shabnamImg,
  },
  {
    name: "Karen J. Omidi",
    title: "Operations Manager",
    description: "Mr. Karen J. Omidi, the next generation, manages operations and innovation, driving the company forward.",
    image: karenImg, 
  },
];

const About = () => {
  const awards = [
    "Top Exporter Certificate",
    "National Leading Entrepreneur",
    "Iranian National Standard Certifications",
    "Product Quality & Customer Orientation",
    "Customer Satisfaction & Quality Excellence",
    "5 Patents for Innovative Machine Designs",
    "CE & ISO 9001:2008 (TÜV Germany)"
  ];

  const exhibitions = [
    "Anuga FoodTec (India)",
    "Interpack (Germany)", 
    "GulfFood (Dubai)",
    "F-Stanbul (Turkey)",
    "Anutec (India)",
    "Naan (Iran)"
  ];

  const productLines = [
    "Fully automatic lines for filled cookies",
    "Production lines for cupcakes, pie cakes, and fun cakes",
    "Layer cakes and Swiss roll production lines", 
    "Choco pie production lines",
    "Chocolate and nut bar production lines",
    "Bread and filled bread production lines",
    "Spiral cooling systems",
    "Tunnel ovens of various types",
    "Mixers, pre-mixers, and vertical mixers",
    "Automation systems for integrated production lines"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            🏢 About Us
          </h1>
          <p className="text-2xl text-primary font-semibold mb-8">
            Omidi Machinery Industries
          </p>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Company Background</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Omidi Machinery Industries was established in <strong className="text-primary">1988</strong> (1367 in the Iranian calendar) 
                  by Mr. Farhad Jamal Omidi, with the mission of designing and manufacturing high-quality food processing machinery.
                </p>
                <p>
                  Since its inception, the company has specialized in producing semi-automatic and fully automatic production lines 
                  tailored to the needs of the food industry.
                </p>
                <p>
                  Today, with over <strong className="text-primary">250 skilled employees</strong>, a facility spanning 
                  <strong className="text-primary"> 30,000 square meters</strong>, and certifications including CE and ISO 9001:2008 
                  from TÜV Germany, Omidi Machinery has become one of the most trusted manufacturers of food processing equipment.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-gradient-card">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary mb-2">250+</div>
                  <div className="text-muted-foreground">Skilled Employees</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-gradient-card">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary mb-2">30K</div>
                  <div className="text-muted-foreground">Square Meters</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-gradient-card">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary mb-2">800+</div>
                  <div className="text-muted-foreground">Domestic Units</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-gradient-card">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary mb-2">68+</div>
                  <div className="text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Leadership */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6"> Company Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Omidi Machinery is a family-owned business, led by a dedicated management team committed to excellence and innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managers.map((manager, idx) => (
              <Card key={manager.name} className="p-6 bg-background/80 text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <img
                    src={manager.image}
                    alt={manager.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary mb-4 bg-muted"
                  />
                  <h3 className="text-2xl font-semibold text-foreground mb-1">{manager.name}</h3>
                  <span className="text-primary font-medium mb-2">{manager.title}</span>
                  <p className="text-muted-foreground text-base">{manager.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Product Lines */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6"> Core Product Lines</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our expertise lies in the design and manufacturing of complete production systems for the food industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productLines.map((product, index) => (
              <Card key={index} className="p-6 bg-background/80 hover:bg-background transition-colors">
                <CardContent className="p-0 flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-foreground">{product}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognitions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">🏅 Awards & Recognitions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Over the years, Omidi Machinery has earned numerous accolades for excellence in quality, innovation, and export performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="p-6 bg-gradient-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-0 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">{award}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground italic">
              🔹 Photo gallery showcasing awards, certificates, and product innovations coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Factory Tour Video Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">🏭 Factory Tour</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To ensure transparency and build trust, Omidi Machinery offers a live production unit at our headquarters, allowing clients to witness our equipment in real operation.
            </p>
          </div>
          <div className="relative bg-background/80 rounded-2xl p-8 border border-border flex flex-col items-center">
            <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-border mb-6">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/0pxNTwjyYR4" 
                title="Factory Tour Video"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Factory Tour Video</h3>
            <p className="text-muted-foreground">
              🎬 Explore our production lines, R&D centers, and testing facilities in this exclusive video tour.
            </p>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">🌍 Global Presence</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              As part of our global outreach strategy, Omidi Machinery actively participates in leading international 
              trade shows and exhibitions across Asia, Europe, Africa, and the Middle East.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {exhibitions.map((exhibition, index) => (
              <Card key={index} className="p-6 bg-gradient-card hover:shadow-card transition-all duration-300">
                <CardContent className="p-0 flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{exhibition}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground italic">
              🔹 Photos and videos from our participation in global exhibitions coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">Our Mission</h2>
          <div className="text-xl text-muted-foreground leading-relaxed space-y-6">
            <p>
              At Omidi Machinery, our goal is simple yet powerful: to walk side-by-side with our clients, 
              ensuring their satisfaction and success. We believe in long-term partnerships, built on trust, 
              innovation, and unwavering quality.
            </p>
            <p className="text-2xl font-semibold text-primary">
              Let's grow together.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;