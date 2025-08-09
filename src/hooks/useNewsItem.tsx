// hooks/useNewsItem.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type NewsItem = Database['public']['Tables']['news']['Row'];

export const useNewsItem = (id: string) => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchNewsItem = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setNewsItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news item');
        console.error('Error fetching news item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  return { newsItem, loading, error };
};