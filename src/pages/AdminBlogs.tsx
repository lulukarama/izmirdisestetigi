import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  getBlogPosts,
  type BlogPost
} from "@/lib/supabase/blogs";
import { generateSlug } from "@/lib/supabase/blogs";
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from "@/components/ui/editor/MenuBar";

// Extend the BlogPost type to include author
type BlogPostWithAuthor = BlogPost & {
  author: string;
};

const AdminBlogs = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostWithAuthor | null>(null);
  const [blogs, setBlogs] = useState<BlogPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedBlog?.content || '',
    onUpdate: ({ editor }) => {
      // Update the content when typing
      if (selectedBlog) {
        setSelectedBlog({
          ...selectedBlog,
          content: editor.getHTML()
        });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 min-h-[400px] focus:outline-none',
      },
    },
  });

  // Update editor content when selectedBlog changes
  useEffect(() => {
    if (editor && selectedBlog) {
      editor.commands.setContent(selectedBlog.content);
    }
  }, [selectedBlog, editor]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchBlogs();
  }, [isAuthenticated]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blog posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    editor?.commands.setContent('');
    setIsCreateModalOpen(true);
  };

  const handleEdit = (blog: BlogPostWithAuthor) => {
    setSelectedBlog(blog);
    editor?.commands.setContent(blog.content);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogPost(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        toast.success("Blog post deleted successfully");
      } catch (error) {
        toast.error("Failed to delete blog post");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const status = formData.get('status') as 'draft' | 'published';

    try {
      const blogData = {
        title,
        slug: generateSlug(title),
        content: editor.getHTML(),
        status,
        author,
      };

      if (selectedBlog) {
        await updateBlogPost(selectedBlog.id, blogData);
        toast.success("Blog post updated successfully");
      } else {
        await createBlogPost(blogData);
        toast.success("Blog post created successfully");
      }

      setIsCreateModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedBlog(null);
      fetchBlogs();
    } catch (error) {
      toast.error(selectedBlog ? "Failed to update blog post" : "Failed to create blog post");
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dental-purple"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Button onClick={handleCreate} className="bg-dental-purple hover:bg-dental-purple/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Blog Posts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 w-16">ID</th>
                  <th className="text-left py-2 px-3">Title</th>
                  <th className="text-left py-2 px-3">Author</th>
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-500">#{blog.id.slice(0, 8)}</td>
                    <td className="py-3 px-3">{blog.title}</td>
                    <td className="py-3 px-3">{blog.author}</td>
                    <td className="py-3 px-3">{new Date(blog.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-3">{getStatusBadge(blog.status)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{isCreateModalOpen ? "Create New Blog Post" : "Edit Blog Post"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      name="title"
                      type="text"
                      placeholder="Enter blog post title"
                      defaultValue={selectedBlog?.title}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <Input
                      name="author"
                      type="text"
                      placeholder="Enter author name"
                      defaultValue={selectedBlog?.author}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    defaultValue={selectedBlog?.status || 'draft'}
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <div className="border rounded-md">
                    <MenuBar editor={editor} />
                    <div className="prose max-w-none p-4 min-h-[400px] focus:outline-none">
                      {editor && <EditorContent editor={editor} />}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsEditModalOpen(false);
                      setSelectedBlog(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-dental-purple hover:bg-dental-purple/90">
                    {isCreateModalOpen ? "Create Post" : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs; 