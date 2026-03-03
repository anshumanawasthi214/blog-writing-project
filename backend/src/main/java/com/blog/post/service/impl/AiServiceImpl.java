package com.blog.post.service.impl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.blog.post.service.AiService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {
	private final ChatClient chatClient;

	@Override
	public String generateSuggestion(String userInput) {
		 String prompt =
	                "Generate a helpful and professional suggestion for the following input:\n"
	                + userInput;

	        return chatClient
	                .prompt(prompt)
	                .call()
	                .content();
	    }
}
