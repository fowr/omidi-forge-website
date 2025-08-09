import { useState, useEffect } from "react";
import { ArrowRight, Download, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Component {
  id: string;
  name: string;
  description: string;
  component_type: string;
  specifications: Record<string, any>;
  manufacturer: string;
  model_number: string;
  is_active: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
  updated_at: string;
}

const Components = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const { toast } = useToast();

  // Get unique component types and manufacturers for filters
  const componentTypes = [...new Set(components.map(c => c.component_type).filter(Boolean))];
  const manufacturers = [...new Set(components.map(c => c.manufacturer).filter(Boolean))];

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComponents(data || []);

    } catch (error) {
      console.error('Error fetching components:', error);
      toast({
        title: "Error",
        description: "Failed to load components",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort components
  const filteredComponents = components
    .filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.model_number?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === "all" || component.component_type === selectedType;
      const matchesManufacturer = selectedManufacturer === "all" || component.manufacturer === selectedManufacturer;
      
      return matchesSearch && matchesType && matchesManufacturer;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'manufacturer':
          return (a.manufacturer || '').localeCompare(b.manufacturer || '');
        case 'type':
          return (a.component_type || '').localeCompare(b.component_type || '');
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-lg text-muted-foreground">Loading components...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Machineries
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive specification of individual machines. 
            Perfect for custom configurations or replacing existing equipment.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search Machinery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Component Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {componentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Manufacturer Filter */}
              <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Manufacturers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Manufacturers</SelectItem>
                  {manufacturers.map((manufacturer) => (
                    <SelectItem key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredComponents.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-foreground mb-2">No components found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedManufacturer("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredComponents.map((component) => (
                <Card key={component.id} className="group bg-card border-border hover:shadow-elegant transition-smooth overflow-hidden">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={component.image_url || '/placeholder.svg'}
                      alt={component.image_alt || component.name}
                      className="w-full h-full group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {component.component_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Component'}
                      </Badge>
                      {component.manufacturer && (
                        <Badge variant="outline" className="text-xs">
                          {component.manufacturer}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                      {component.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {component.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Model Number */}
                      {component.model_number && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Model:</span> {component.model_number}
                        </div>
                      )}

                      {/* Key Specifications 
                      {component.specifications && Object.keys(component.specifications).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(component.specifications)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">
                                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                </span> {String(value)}
                              </div>
                            ))}
                        </div>
                      )}
                      */}
                      
                      <div className="flex gap-3">
                        <Button asChild className="bg-gradient-primary hover:shadow-glow flex-1">
                          <Link to={`/components/${component.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help Finding the Right Component?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our technical team can help you select the perfect components for your 
            specific application requirements and production goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
              Contact Technical Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Request Compatibility Check
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Components;