package com.blog.post.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.blog.post.model.Blog;

public interface BlogRepository extends MongoRepository<Blog, String> {
	   List<Blog> findByAuthorId(String authorId);
}