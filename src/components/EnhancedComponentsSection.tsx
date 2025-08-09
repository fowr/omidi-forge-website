import { useState } from "react";
import { 
  Package, 
  Info, 
  ChevronRight, 
  Cpu, 
  Zap,
  Settings,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Component {
  id: string;
  name: string;
  description: string;
  component_type: string;
  specifications: Record<string, any>;
  manufacturer: string;
  model_number: string;
  image_url?: string;
  image_alt?: string;
}

interface ProductComponent {
  id: string;
  quantity: number;
  is_optional: boolean;
  notes: string | null;
  component: Component;
}

interface EnhancedComponentsSectionProps {
  components: ProductComponent[];
  productName: string;
}

export const EnhancedComponentsSection = ({ 
  components, 
  productName 
}: EnhancedComponentsSectionProps) => {
  const [selectedComponent, setSelectedComponent] = useState<ProductComponent | null>(null);
  
  // Group components by type
  const groupedComponents = components.reduce((acc, pc) => {
    const type = pc.component.component_type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(pc);
    return acc;
  }, {} as Record<string, ProductComponent[]>);

  const getComponentIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      mixer: Settings,
      oven: Zap,
      encrusting_machine: Cpu,
      aligning_system: Settings,
      packaging: Package,
      conveyor: ChevronRight,
      depositor: Settings,
      cooling_system: Zap,
      controller: Cpu,
      default: Package
    };
    return iconMap[type] || iconMap.default;
  };

  const formatComponentType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderSpecifications = (specs: Record<string, any>) => {
    if (!specs || Object.keys(specs).length === 0) return null;
    
    return Object.entries(specs).slice(0, 3).map(([key, value]) => (
      <div key={key} className="flex justify-between items-center py-1">
        <span className="text-sm text-muted-foreground">
          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
        </span>
        <span className="text-sm font-medium">{String(value)}</span>
      </div>
    ));
  };

  if (components.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No components information available.</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Components Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Components</p>
                  <p className="text-2xl font-bold text-primary">{components.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Required</p>
                  <p className="text-2xl font-bold text-primary">
                    {components.filter(c => !c.is_optional).length}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Optional</p>
                  <p className="text-2xl font-bold text-primary">
                    {components.filter(c => c.is_optional).length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Components by Type */}
        {Object.entries(groupedComponents).map(([type, typeComponents]) => {
          const Icon = getComponentIcon(type);
          
          return (
            <div key={type} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  {formatComponentType(type)}
                </h3>
                <Badge variant="secondary" className="ml-2">
                  {typeComponents.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeComponents.map((pc) => (
                  <Card 
                    key={pc.id} 
                    className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedComponent(pc)}
                  >
                    <CardContent className="p-0">
                      {/* Component Image */}
                      <div className="relative h-48 bg-muted/30 overflow-hidden rounded-t-lg">
                        {pc.component.image_url ? (
                          <img 
                            src={pc.component.image_url}
                            alt={pc.component.image_alt || pc.component.name}
                            className="w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-2 right-2 flex gap-2">
                          {pc.quantity > 1 && (
                            <Badge className="bg-background/90 text-foreground">
                              ×{pc.quantity}
                            </Badge>
                          )}
                          {pc.is_optional && (
                            <Badge variant="secondary" className="bg-background/90">
                              Optional
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Component Details */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground line-clamp-1">
                            {pc.component.name}
                          </h4>
                          {pc.component.model_number && (
                            <p className="text-xs text-muted-foreground">
                              Model: {pc.component.model_number}
                            </p>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {pc.component.description}
                        </p>
                        
                        {/* Quick Specs */}
                        {pc.component.specifications && 
                         Object.keys(pc.component.specifications).length > 0 && (
                          <div className="pt-2 border-t border-border">
                            {renderSpecifications(pc.component.specifications)}
                          </div>
                        )}
                        
                        {/* View Details Button */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-2 text-primary hover:text-primary/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent(pc);
                          }}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Component Detail Modal */}
        <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedComponent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedComponent.component.name}
                  </DialogTitle>
                  <DialogDescription>
                    Detailed specifications and information
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Image */}
                  <div className="space-y-4">
                    <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
                      {selectedComponent.component.image_url ? (
                        <img 
                          src={selectedComponent.component.image_url}
                          alt={selectedComponent.component.image_alt || selectedComponent.component.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    
                    {/* Basic Info */}
                    <Card className="bg-muted/30 border-border">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Type</span>
                          <Badge variant="outline">
                            {formatComponentType(selectedComponent.component.component_type)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Quantity</span>
                          <span className="font-medium">{selectedComponent.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge variant={selectedComponent.is_optional ? "secondary" : "default"}>
                            {selectedComponent.is_optional ? "Optional" : "Required"}
                          </Badge>
                        </div>
                        {selectedComponent.component.manufacturer && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Manufacturer</span>
                            <span className="font-medium">{selectedComponent.component.manufacturer}</span>
                          </div>
                        )}
                        {selectedComponent.component.model_number && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Model</span>
                            <span className="font-medium">{selectedComponent.component.model_number}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Detailed Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground">
                        {selectedComponent.component.description}
                      </p>
                    </div>
                    
                    {selectedComponent.notes && (
                      <div>
                        <h4 className="font-semibold mb-2">Installation Notes</h4>
                        <p className="text-muted-foreground text-sm italic">
                          {selectedComponent.notes}
                        </p>
                      </div>
                    )}
                    
                    {/* Specifications */}
                    {selectedComponent.component.specifications && 
                     Object.keys(selectedComponent.component.specifications).length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Technical Specifications</h4>
                        <Card className="bg-muted/30 border-border">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              {Object.entries(selectedComponent.component.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center py-1 gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </span>
                                  <span className="text-sm font-medium">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};