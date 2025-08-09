import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { useNewsItem } from "@/hooks/useNewsItem";

const NewsDetailDynamic = () => {
  const { id } = useParams<{ id: string }>();
  const { newsItem, loading, error } = useNewsItem(id || '');

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
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-4"></div>
              <div className="h-12 bg-muted rounded w-full mb-6"></div>
              <div className="aspect-video bg-muted rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
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
            <p className="text-muted-foreground mb-6">
              {error || 'The news article you are looking for does not exist.'}
            </p>
            <Link to="/news">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="py-2 bg-background">
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
        <section className="py-2 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {newsItem.published_at 
                    ? new Date(newsItem.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : newsItem.created_at
                    ? new Date(newsItem.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'No date available'
                  }
                </span>
              </div>
              
              {newsItem.news_type && (
                <Badge className={getCategoryColor(newsItem.news_type)}>
                  {formatNewsType(newsItem.news_type)}
                </Badge>
              )}
              
              {newsItem.is_featured && (
                <Badge className="bg-yellow-500/10 text-yellow-600">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {newsItem.title}
            </h1>
            
            {newsItem.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {newsItem.excerpt}
              </p>
            )}
            
            {/* Tags */}
            {newsItem.tags && newsItem.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {newsItem.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Image */}
        {newsItem.featured_image_url && (
          <section className="py-2 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden mb-8">
                <img 
                  src={newsItem.featured_image_url} 
                  alt={newsItem.featured_image_alt || newsItem.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {newsItem.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null;
                return (
                  <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related or Back to News */}
        <section className="py-12 bg-gradient-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Want to Read More?
            </h2>
            <p className="text-muted-foreground mb-6">
              Check out our other news articles and stay updated with the latest from Omidi Machinery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/news">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                  View All News
                </Button>
              </Link>
              <a 
                href="https://www.youtube.com/@OMIDI.Machinery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit Our Channel
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetailDynamic;