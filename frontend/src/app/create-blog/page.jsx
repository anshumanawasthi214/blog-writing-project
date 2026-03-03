"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Textarea from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import { createBlog } from "../../lib/blog-api";

export default function CreateBlogPage() {
  const router = useRouter();
  const { user, hydrated, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isSubmittingRef = useRef(false);
  const authorName = user?.name || user?.username || user?.email || "Unknown";

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || isSubmittingRef.current) {
      return;
    }
    isSubmittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      await createBlog({
        title,
        content,
        authorId: String(user?.id),
        authorName,
      });
      router.push("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create blog.");
    } finally {
      isSubmittingRef.current = false;
      setLoading(false);
    }
  };

  if (!hydrated || !isAuthenticated) {
    return <p className="text-sm text-zinc-400">Checking authentication...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
