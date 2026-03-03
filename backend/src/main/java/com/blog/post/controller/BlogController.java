package com.blog.post.controller;

import java.util.List;

import org.springframework.ai.chat.client.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.post.dto.BlogCreateRequest;
import com.blog.post.dto.BlogUpdateRequest;
import com.blog.post.model.Blog;
import com.blog.post.service.AiService;
import com.blog.post.service.BlogService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/blogs")
@CrossOrigin
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final AiService aiService;

   

    // CREATE
    @PostMapping("create")
    public Blog create(@Valid @RequestBody BlogCreateRequest request) {
        if(blogService.createBlog(request)==null) {
        	return null;
        }else {
        	return blogService.createBlog(request);
        }
    }

    // READ ALL
    @GetMapping
    public List<Blog> getAll() {
        return blogService.getAllBlogs();
    }

    // READ BY USER
    @GetMapping("/user/{authorId}")
    public List<Blog> getByAuthor(@PathVariable String authorId) {
        return blogService.getBlogsByAuthor(authorId);
    }

    // UPDATE
    @PutMapping
    public Blog update(@Valid @RequestBody BlogUpdateRequest request) {
        return blogService.updateBlog(request);
    }

    // DELETE
    @DeleteMapping("/{blogId}/{authorId}")
    public void delete(
            @PathVariable String blogId,
            @PathVariable String authorId) {
        blogService.deleteBlog(blogId, authorId);
    }
   

    @GetMapping("/ai/suggest")
    public String aiSuggest(@RequestParam String input) {
        return aiService.generateSuggestion(input);
    }
    
}