package com.blog.post.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlogCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "AuthorId is required")
    private String authorId;
    
    @NotBlank(message = "AuthorName is required")
    private String authorName;
}