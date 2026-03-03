package com.blog.post.service;

import com.blog.post.dto.BlogCreateRequest;
import com.blog.post.dto.BlogUpdateRequest;
import com.blog.post.model.Blog;

import java.util.List;

public interface BlogService {

    Blog createBlog(BlogCreateRequest request);

    List<Blog> getAllBlogs();

    List<Blog> getBlogsByAuthor(String authorId);

    Blog updateBlog(BlogUpdateRequest request);

    void deleteBlog(String blogId, String authorId);
}