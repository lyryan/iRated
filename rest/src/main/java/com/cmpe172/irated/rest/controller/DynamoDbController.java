package com.cmpe172.irated.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe172.irated.rest.model.Rating;
import com.cmpe172.irated.rest.repository.DynamoDbRepository;

@RestController
@RequestMapping("/dynamoDb")
public class DynamoDbController {
    @Autowired
    private DynamoDbRepository repository;

    @PostMapping
    public String insertIntoDynamoDB(@RequestBody Rating rating){
        repository.insertIntoDynamoDB(rating);
        return "Successfully inserted into DynamoDB table";
    }
}