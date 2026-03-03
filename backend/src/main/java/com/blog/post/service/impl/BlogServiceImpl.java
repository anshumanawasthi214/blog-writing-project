package com.blog.post.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.post.dto.BlogCreateRequest;
import com.blog.post.dto.BlogUpdateRequest;
import com.blog.post.exception.BadRequestException;
import com.blog.post.exception.ResourceNotFoundException;
import com.blog.post.model.Blog;
import com.blog.post.model.User;
import com.blog.post.repository.BlogRepository;
import com.blog.post.repository.UserRepository;
import com.blog.post.service.BlogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
   

    // ✅ CREATE
    @Override
    public Blog createBlog(BlogCreateRequest request) {
    	User user=userRepository.findById(request.getAuthorId()).orElse(null);
    	if(user==null) {
    		return null;
    	}
    	else {
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setAuthorId(request.getAuthorId());
        blog.setCreatedAt(LocalDateTime.now());
        blog.setAuthorName(request.getAuthorName());
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    	}
    }

    // ✅ READ (ALL)
    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // ✅ READ (BY USER)
    @Override
    public List<Blog> getBlogsByAuthor(String authorId) {
        return blogRepository.findByAuthorId(authorId);
    }

    // 🔐 UPDATE (OWNER ONLY)
    @Override
    public Blog updateBlog(BlogUpdateRequest request) {

        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        if (!blog.getAuthorId().equals(request.getAuthorId())) {
            throw new BadRequestException("You are not allowed to update this blog");
        }
        blog.setAuthorName(request.getAuthorName());
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }

    // 🔐 DELETE (OWNER ONLY)
    @Override
    public void deleteBlog(String blogId, String authorId) {

        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        if (!blog.getAuthorId().equals(authorId)) {
            throw new BadRequestException("You are not allowed to delete this blog");
        }

        blogRepository.delete(blog);
    }
}