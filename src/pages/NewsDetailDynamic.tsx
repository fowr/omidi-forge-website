import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Play, ExternalLink } from "lucide-react";
import { useNewsItem } from "@/hooks/useNewsItem";

const NewsDetailDynamic = () => {
  const { id } = useParams<{ id: string }>();
  const { newsItem, loading, error } = useNewsItem(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-4"></div>
              <div className="h-12 bg-muted rounded w-full mb-6"></div>
              <div className="aspect-video bg-muted rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">News Article Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The news article you are looking for does not exist.'}</p>
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
    switch (category?.toLowerCase()) {
      case 'loading orders':
        return "bg-green-500/10 text-green-600";
      case 'exhibitions':
        return "bg-blue-500/10 text-blue-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
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
              <span>
                {newsItem.published_at 
                  ? new Date(newsItem.published_at).toLocaleDateString()
                  : new Date(newsItem.created_at).toLocaleDateString()
                }
              </span>
              {newsItem.category && (
                <Badge className={getCategoryColor(newsItem.category)}>
                  {newsItem.category}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {newsItem.title}
            </h1>
            
            {newsItem.excerpt && (
              <p className="text-xl text-muted-foreground mb-8">
                {newsItem.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* Featured Image */}
        {newsItem.image_url && (
          <section className="py-8 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-8">
                <img 
                  src={newsItem.image_url} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Video Section */}
        {newsItem.video_url && (
          <section className="py-8 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Watch the Video</h2>
              <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-8">
                <iframe
                  src={newsItem.video_url}
                  title={newsItem.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {newsItem.content && (
              <div className="prose prose-lg max-w-none text-foreground">
                {newsItem.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Action Links */}
        {newsItem.video_url && (
          <section className="py-8 bg-background border-t border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-4">
                <a 
                  href={newsItem.video_url}
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetailDynamic;