package com.blog.post.service.impl;


import org.springframework.stereotype.Service;

import com.blog.post.dto.LoginRequest;
import com.blog.post.dto.RegisterRequest;
import com.blog.post.exception.BadRequestException;
import com.blog.post.model.User;
import com.blog.post.repository.UserRepository;
import com.blog.post.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        return userRepository.save(user);
    }

    @Override
    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (!(request.getPassword().equals((user).getPassword()))) {
            throw new BadRequestException("Invalid credentials");
        }

        return user;
    }
}