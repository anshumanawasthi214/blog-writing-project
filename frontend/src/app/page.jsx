"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllBlogs } from "../lib/blog-api";
import Button from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getAuthorName = (blog) =>
    blog.authorName ||
    blog.author?.name ||
    blog.author?.fullName ||
    blog.author?.username ||
    blog.author?.email ||
    blog.authorId ||
    "Unknown author";

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAllBlogs();
        setBlogs(response.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Read latest blogs from all authors.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/ai-suggest">
            <Button variant="outline">AI Suggest</Button>
          </Link>
          {isAuthenticated && (
            <Link href="/create-blog">
              <Button>Create Blog</Button>
            </Link>
          )}
        </div>
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading blogs...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="space-y-4">
        {!loading &&
          !error &&
          blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  By {getAuthorName(blog)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300">
                  {String(blog.content || "").slice(0, 220)}
                  {String(blog.content || "").length > 220 ? "..." : ""}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
