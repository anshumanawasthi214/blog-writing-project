"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import { deleteBlog, getBlogsByUser } from "../../lib/blog-api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, hydrated, isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!hydrated || !isAuthenticated || !user?.id) return;

    const loadMyBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getBlogsByUser(user.id);
        setBlogs(response.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load your blogs.");
      } finally {
        setLoading(false);
      }
    };

    loadMyBlogs();
  }, [hydrated, isAuthenticated, router, user?.id]);

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await deleteBlog(blogId, user.id);
      setBlogs((current) => current.filter((blog) => blog.id !== blogId));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete blog.");
    }
  };

  if (!hydrated || !isAuthenticated) {
    return <p className="text-sm text-zinc-400">Checking authentication...</p>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {user?.name || user?.username || "User"} ({user?.email || "No email"})
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Blogs</h2>
        <Button onClick={() => router.push("/create-blog")}>Create Blog</Button>
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading your blogs...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && blogs.length === 0 && (
        <p className="text-sm text-zinc-400">You have not created any blogs yet.</p>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>
                {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-zinc-300">
                {String(blog.content || "").slice(0, 220)}
                {String(blog.content || "").length > 220 ? "..." : ""}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/blog/${blog.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
