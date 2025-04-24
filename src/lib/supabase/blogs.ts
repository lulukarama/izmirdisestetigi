import { supabase } from './client';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  author: string;
  created_at: string;
  updated_at: string;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  const { data, error } = await supabase
    .from('blogs')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getBlogPost = async (id: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Helper function to generate slug from title
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}; 