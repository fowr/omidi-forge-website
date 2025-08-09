import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useNews } from "@/hooks/useNews";

const News = () => {
  const { news, loading, error } = useNews();

  const getCategoryColor = (newsType: string | null) => {
    if (!newsType) return "bg-gray-500/10 text-gray-600";
    
    switch (newsType.toLowerCase()) {
      case 'product_delivery':
        return "bg-green-500/10 text-green-600";
      case 'trade_show':
        return "bg-blue-500/10 text-blue-600";
      case 'company_news':
        return "bg-purple-500/10 text-purple-600";
      case 'industry_update':
        return "bg-orange-500/10 text-orange-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const formatNewsType = (newsType: string | null) => {
    if (!newsType) return 'News';
    return newsType.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-lg text-muted-foreground">Loading news...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-lg text-destructive">Error loading news: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
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
        <section className="py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {news.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-foreground mb-4">No News Available</h3>
                <p className="text-muted-foreground">Check back later for updates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <Card key={item.id} className="bg-gradient-card border-border overflow-hidden hover:shadow-glow transition-smooth">
                    <div className="relative">
                      <div className="aspect-video bg-secondary/20 overflow-hidden">
                        <img 
                          src={item.featured_image_url || '/placeholder.svg'} 
                          alt={item.featured_image_alt || item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      {item.news_type && (
                        <Badge 
                          className={`absolute top-4 left-4 ${getCategoryColor(item.news_type)}`}
                        >
                          {formatNewsType(item.news_type)}
                        </Badge>
                      )}
                      {item.is_featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {item.published_at 
                            ? new Date(item.created_at).toLocaleDateString()
                            : item.created_at 
                            ? new Date(item.created_at).toLocaleDateString()
                            : 'No date'
                          }
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {item.excerpt || (item.content?.substring(0, 150) + '...') || 'No preview available.'}
                      </p>
                      <div className="flex justify-start">
                        <Link 
                          to={`/news/${item.id}`}
                          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Read More</span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://www.youtube.com/@OMIDI.Machinery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-glow transition-smooth flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Subscribe on YouTube</span>
              </a>
              <a 
                href="https://instagram.com/omidi.machinery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-secondary text-white px-6 py-3 rounded-lg hover:shadow-glow transition-smooth flex items-center justify-center space-x-2"
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