import { useState, useEffect } from 'react';
import { Search, Package, Upload, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MediaUpload, MediaItem } from '@/components/admin/forms/MediaUpload';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;
type ProductMedia = Tables<'product_media'>;

export default function ProductMediaManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Fetch media for selected product
  useEffect(() => {
    if (!selectedProductId) {
      setCurrentMedia([]);
      setSelectedProduct(null);
      return;
    }

    const fetchProductMedia = async () => {
      setLoading(true);
      try {
        // Get product details
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', selectedProductId)
          .single();
        
        if (productError) throw productError;
        setSelectedProduct(product);

        // Get existing media
        const { data: media, error: mediaError } = await supabase
          .from('product_media')
          .select('*')
          .eq('product_id', selectedProductId)
          .order('sort_order');
        
        if (mediaError) throw mediaError;

        // Convert database media to MediaItem format
        const mediaItems: MediaItem[] = (media || []).map(item => ({
          id: item.id,
          file_url: item.file_url,
          file_name: item.file_name || 'Unknown file',
          media_type: item.media_type as 'image' | 'video' | 'document',
          is_primary: item.is_primary || false,
          alt_text: item.alt_text,
          title: item.title,
          sort_order: item.sort_order || 0
        }));

        setCurrentMedia(mediaItems);
      } catch (error) {
        console.error('Error fetching product media:', error);
        toast({
          title: "Error",
          description: "Failed to load product media",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductMedia();
  }, [selectedProductId, toast]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle media changes
  const handleMediaChange = (newMedia: MediaItem[]) => {
    setCurrentMedia(newMedia);
  };

  // Save media changes to database
  const saveMediaChanges = async () => {
    if (!selectedProductId) {
      toast({
        title: "Error",
        description: "Please select a product first",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      // Delete existing media for this product
      const { error: deleteError } = await supabase
        .from('product_media')
        .delete()
        .eq('product_id', selectedProductId);
      
      if (deleteError) throw deleteError;

      // Insert new media items
      if (currentMedia.length > 0) {
        const mediaToInsert = currentMedia.map((item, index) => ({
          product_id: selectedProductId,
          file_url: item.file_url,
          file_name: item.file_name,
          media_type: item.media_type,
          is_primary: item.is_primary,
          alt_text: item.alt_text,
          title: item.title,
          sort_order: index
          // mime_type: getMimeType(item.file_name)
        }));

        const { error: insertError } = await supabase
          .from('product_media')
          .insert(mediaToInsert);
        
        if (insertError) throw insertError;
      }

      toast({
        title: "Success",
        description: `Media updated for ${selectedProduct?.name}`,
      });
    } catch (error) {
      console.error('Error saving media:', error);
      toast({
        title: "Error",
        description: "Failed to save media changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Product Media Manager</h1>
            <p className="text-muted-foreground">
              Manage images, videos, and documents for your products
            </p>
          </div>
        </div>

        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Select Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Product Selection */}
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a product to manage media for..." />
              </SelectTrigger>
              <SelectContent>
                {filteredProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{product.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({product.product_type})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedProduct && (
              <div className="p-3 bg-muted rounded-lg">
                <h3 className="font-medium">{selectedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedProduct.short_description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    {selectedProduct.product_type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Current media items: {currentMedia.length}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Management */}
        {selectedProductId && (
          <div className="space-y-6">
            <MediaUpload
              media={currentMedia}
              onChange={handleMediaChange}
              folderPath={`products/${selectedProduct?.slug || 'unknown'}`}
            />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={saveMediaChanges} 
                disabled={saving || loading}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Upload className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Media Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedProductId && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Product Selected</h3>
              <p className="text-muted-foreground">
                Select a product above to start managing its media files
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

// // Helper function to determine MIME type from file extension
// function getMimeType(fileName: string): string {
//   const ext = fileName.split('.').pop()?.toLowerCase();
  
//   const mimeTypes: Record<string, string> = {
//     // Images
//     jpg: 'image/jpeg',
//     jpeg: 'image/jpeg',
//     png: 'image/png',
//     gif: 'image/gif',
//     webp: 'image/webp',
//     svg: 'image/svg+xml',
    
//     // Videos
//     mp4: 'video/mp4',
//     webm: 'video/webm',
//     avi: 'video/avi',
//     mov: 'video/quicktime',
    
//     // Documents
//     pdf: 'application/pdf',
//     doc: 'application/msword',
//     docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     txt: 'text/plain'
//   };
  
//   return mimeTypes[ext || ''] || 'application/octet-stream';
// }