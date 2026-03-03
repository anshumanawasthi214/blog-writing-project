"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../../../components/ui/button";
import Input from "../../../../components/ui/input";
import Textarea from "../../../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { useAuth } from "../../../../context/AuthContext";
import { getBlogById, updateBlog } from "../../../../lib/blog-api";

export default function EditBlogPage({ params }) {
  const router = useRouter();
  const { user, hydrated, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const authorName = user?.name || user?.username || user?.email || "Unknown";

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!hydrated || !isAuthenticated) return;

    const loadBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(params.id);
        const blog = response.data || {};
        setTitle(blog.title || "");
        setContent(blog.content || "");
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [hydrated, isAuthenticated, params.id, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateBlog({
        blogId: String(params.id),
        title,
        content,
        authorId: String(user?.id),
        authorName,
      });
      router.push("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (!hydrated || !isAuthenticated) {
    return <p className="text-sm text-zinc-400">Checking authentication...</p>;
  }

  if (loading) {
    return <p className="text-sm text-zinc-400">Loading blog...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="Blog title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <Textarea
              placeholder="Write your content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={10}
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
