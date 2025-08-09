// types/news.ts
import { Database } from '@/integrations/supabase/types';

export type NewsItem = Database['public']['Tables']['news']['Row'];

export interface NewsFilters {
  news_type?: string;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
}