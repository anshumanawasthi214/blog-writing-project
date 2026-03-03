package com.blog.post.service;

import com.blog.post.dto.LoginRequest;
import com.blog.post.dto.RegisterRequest;
import com.blog.post.model.User;

public interface AuthService {
    User register(RegisterRequest request);
    User login(LoginRequest request);
}