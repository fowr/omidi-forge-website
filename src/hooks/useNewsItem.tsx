import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type NewsItem = Database['public']['Tables']['news']['Row'];

export const useNewsItem = (id: string) => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsItem = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setNewsItem(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setNewsItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNewsItem();
    }
  }, [id]);

  return { newsItem, loading, error, refetch: fetchNewsItem };
};