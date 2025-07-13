import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, ExternalLink } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Loading Order: Complete Cupcake Production Line to Brazil",
      date: "2024-01-15",
      category: "Loading Orders",
      description: "Successful shipment of our state-of-the-art cupcake production line including depositor, tunnel oven, and cooling spiral to São Paulo, Brazil.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Anuga FoodTec 2024: Showcasing Latest Innovations",
      date: "2024-03-20",
      category: "Exhibitions",
      description: "Omidi Machinery presents breakthrough technologies at Anuga FoodTec in Cologne, Germany. Featuring our new automated layer cake production line.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Major Export: Cookie Production Line to Middle East",
      date: "2024-02-10",
      category: "Loading Orders",
      description: "Comprehensive cookie depositor and tunnel oven system delivered to Dubai for large-scale commercial bakery operations.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "GulfFood 2024: Expanding Middle East Presence",
      date: "2024-02-25",
      category: "Exhibitions",
      description: "Successful participation in GulfFood Dubai 2024, demonstrating our tunnel oven technology and automation systems to regional partners.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Loading Order: Bread Production Line to Southeast Asia",
      date: "2024-01-30",
      category: "Loading Orders",
      description: "Complete bread and filled bread production system shipped to Malaysia, including mixers, ovens, and packaging solutions.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Interpack 2024: Innovation in Packaging Solutions",
      date: "2024-05-12",
      category: "Exhibitions",
      description: "Presenting integrated packaging solutions at Interpack Düsseldorf, showcasing end-to-end production line capabilities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/placeholder.svg"
    }
  ];

  const getCategoryColor = (category: string) => {
    return category === "Loading Orders" ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Latest News & Updates
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with our latest equipment deliveries, exhibition participations, 
              and industry innovations from Omidi Machinery.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <Card key={item.id} className="bg-gradient-card border-border overflow-hidden hover:shadow-glow transition-smooth">
                  <div className="relative">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center">
                      <Play className="h-12 w-12 text-primary" />
                    </div>
                    <Badge 
                      className={`absolute top-4 left-4 ${getCategoryColor(item.category)}`}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-lg text-foreground line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {item.description}
                    </p>
                    <div className="flex space-x-2">
                      <a 
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth text-sm"
                      >
                        <Play className="h-4 w-4" />
                        <span>Watch Video</span>
                      </a>
                      <a 
                        href="#"
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Read More</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Connected
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our YouTube channel for the latest videos and follow us on social media 
              for real-time updates on our projects and exhibitions.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.youtube.com/@OMIDI.Machinery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-glow transition-smooth flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Subscribe on YouTube</span>
              </a>
              <a 
                href="https://instagram.com/omidi.machinery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-secondary text-white px-6 py-3 rounded-lg hover:shadow-glow transition-smooth flex items-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;