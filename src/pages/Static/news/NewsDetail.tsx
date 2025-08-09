import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Play, ExternalLink } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();

  const newsItems = [
    {
      id: "1",
      title: "Loading Order: Complete Cupcake Production Line to Brazil",
      date: "2024-01-15",
      category: "Loading Orders",
      description: "Successful shipment of our state-of-the-art cupcake production line including depositor, tunnel oven, and cooling spiral to São Paulo, Brazil.",
      fullContent: `Our latest export success story features a comprehensive cupcake production line delivered to one of Brazil's leading bakery manufacturers in São Paulo. This complete production system includes our advanced cupcake depositor, high-efficiency tunnel oven, and spiral cooling system.

The production line is capable of producing up to 5,000 cupcakes per hour with consistent quality and minimal waste. The system features our latest automation technology, allowing for precise batter deposition, optimal baking conditions, and efficient cooling processes.

This installation represents our commitment to providing turnkey solutions to our international clients, complete with installation support, operator training, and comprehensive after-sales service.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/cupcake-depositor.jpg"
    },
    {
      id: "2",
      title: "Anuga FoodTec 2024: Showcasing Latest Innovations",
      date: "2024-03-20",
      category: "Exhibitions",
      description: "Omidi Machinery presents breakthrough technologies at Anuga FoodTec in Cologne, Germany. Featuring our new automated layer cake production line.",
      fullContent: `At Anuga FoodTec 2024 in Cologne, Germany, Omidi Machinery unveiled our latest innovations in food processing technology. Our booth featured live demonstrations of our newly developed automated layer cake production line, which incorporates cutting-edge technology for precision baking and consistent quality.

The exhibition provided an excellent platform to connect with industry leaders from across Europe and showcase our commitment to innovation in food processing machinery. We received tremendous interest in our tunnel oven technology and automation systems.

Key highlights included meetings with potential partners from over 20 countries and several preliminary agreements for future collaborations. The positive reception confirms our position as a leading manufacturer in the global food processing industry.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/layer-cake-machine.jpg"
    },
    {
      id: "3",
      title: "Major Export: Cookie Production Line to Middle East",
      date: "2024-02-10",
      category: "Loading Orders",
      description: "Comprehensive cookie depositor and tunnel oven system delivered to Dubai for large-scale commercial bakery operations.",
      fullContent: `Our latest Middle East installation features a complete cookie production system delivered to a major commercial bakery in Dubai. This comprehensive setup includes our high-capacity cookie depositor and state-of-the-art tunnel oven system.

The production line is designed to handle multiple cookie varieties with quick changeover capabilities, supporting the client's diverse product portfolio. The system incorporates our latest energy-efficient tunnel oven technology, reducing operational costs while maintaining superior product quality.

Installation was completed ahead of schedule with full operator training provided on-site. The client has already reported significant improvements in production efficiency and product consistency compared to their previous equipment.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/cookie-depositor.jpg"
    },
    {
      id: "4",
      title: "GulfFood 2024: Expanding Middle East Presence",
      date: "2024-02-25",
      category: "Exhibitions",
      description: "Successful participation in GulfFood Dubai 2024, demonstrating our tunnel oven technology and automation systems to regional partners.",
      fullContent: `GulfFood 2024 in Dubai marked another successful exhibition for Omidi Machinery, strengthening our presence in the Middle East market. Our booth featured live demonstrations of our tunnel oven technology and advanced automation systems.

The exhibition provided valuable opportunities to engage with regional distributors and end-users, showcasing our capabilities in providing complete production solutions. We conducted detailed technical presentations for various product lines including bread, cookie, and cake production systems.

Several promising partnerships were established during the event, with multiple follow-up meetings scheduled for potential projects across the GCC region. The positive response reinforces our strategy for Middle East market expansion.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/tunnel-oven-hero.jpg"
    },
    {
      id: "5",
      title: "Loading Order: Bread Production Line to Southeast Asia",
      date: "2024-01-30",
      category: "Loading Orders",
      description: "Complete bread and filled bread production system shipped to Malaysia, including mixers, ovens, and packaging solutions.",
      fullContent: `Our comprehensive bread production line has been successfully shipped to Malaysia, representing our growing presence in the Southeast Asian market. This complete system includes industrial mixers, pre-mixers, tunnel ovens, and integrated packaging solutions.

The production line is specifically designed for both traditional bread and filled bread products, offering maximum flexibility for the client's diverse product range. Advanced automation features ensure consistent quality while minimizing labor requirements.

Pre-shipment testing was conducted at our facility with the client's representatives present, ensuring all specifications were met. Installation and commissioning support will be provided on-site to guarantee optimal performance from day one.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/tunnel-oven-hero.jpg"
    },
    {
      id: "6",
      title: "Interpack 2024: Innovation in Packaging Solutions",
      date: "2024-05-12",
      category: "Exhibitions",
      description: "Presenting integrated packaging solutions at Interpack Düsseldorf, showcasing end-to-end production line capabilities.",
      fullContent: `At Interpack 2024 in Düsseldorf, Omidi Machinery showcased our integrated packaging solutions, demonstrating how our production lines seamlessly connect with packaging systems for complete end-to-end manufacturing solutions.

The exhibition highlighted our capability to provide not just baking equipment, but complete production ecosystems that include packaging integration. This approach offers our clients significant advantages in terms of efficiency, quality control, and operational optimization.

Industry experts praised our innovative approach to production line integration, particularly our automated transfer systems that maintain product integrity throughout the entire manufacturing process. Several major packaging companies expressed interest in collaborative partnerships.`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      image: "/src/assets/layer-cake-machine.jpg"
    }
  ];

  const newsItem = newsItems.find(item => item.id === id);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">News Article Not Found</h1>
            <Link to="/news">
              <Button variant="outline">Back to News</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    return category === "Loading Orders" ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/news">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <span>{new Date(newsItem.date).toLocaleDateString()}</span>
              <Badge className={getCategoryColor(newsItem.category)}>
                {newsItem.category}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {newsItem.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {newsItem.description}
            </p>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-8">
              <img 
                src={newsItem.image} 
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Watch the Video</h2>
            <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-8">
              <iframe
                src={newsItem.videoUrl}
                title={newsItem.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-foreground">
              {newsItem.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Action Links */}
        <section className="py-8 bg-background border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              <a 
                href={newsItem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
              >
                <Play className="h-5 w-5" />
                <span>Watch on YouTube</span>
              </a>
              <a 
                href="https://www.youtube.com/@OMIDI.Machinery"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Visit Our Channel</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;