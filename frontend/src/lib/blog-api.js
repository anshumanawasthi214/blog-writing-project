import api from "./api";

export function getAllBlogs() {
  return api.get("/blogs");
}

export function getBlogById(id) {
  return getAllBlogs().then((response) => {
    const blogs = response.data || [];
    const blog = blogs.find((item) => String(item.id) === String(id));

    if (!blog) {
      throw new Error("Blog not found");
    }

    return { data: blog };
  });
}

export function createBlog(payload) {
  return api.post("/blogs/create", {
    title: payload.title,
    content: payload.content,
    authorId: payload.authorId,
    authorName: payload.authorName,
  });
}

export function updateBlog(payload) {
  return api.put("/blogs", {
    blogId: payload.blogId,
    title: payload.title,
    content: payload.content,
    authorId: payload.authorId,
    authorName: payload.authorName,
  });
}

export function getBlogsByUser(userId) {
  return api.get(`/blogs/user/${userId}`);
}

export function deleteBlog(blogId, userId) {
  return api.delete(`/blogs/${blogId}/${userId}`);
}

export function getAiSuggestion(input) {
  return api.get("/blogs/ai/suggest", {
    params: { input },
  });
}
