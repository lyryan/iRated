package com.cmpe172.irated.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe172.irated.rest.model.Professor;
import com.cmpe172.irated.rest.model.Review;
import com.cmpe172.irated.rest.repository.DynamoDbRepository;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/dynamoDb")
public class DynamoDbController {
    @Autowired
    private DynamoDbRepository repository;

    @PostMapping
    public String insertProfessorIntoDB(@RequestBody Professor professor) {
        repository.insertProfessorIntoDB(professor);
        return "Successfully inserted Professor into DynamoDB table";
    }

    @GetMapping
    public ResponseEntity<Professor> getProfessorDetails(@RequestParam String professorId) {
        Professor professor = repository.getProfessorDetails(professorId);
        return new ResponseEntity<Professor>(professor, HttpStatus.OK);
    }

    @PutMapping
    public void appendReview(@RequestParam String professorId, @RequestBody Review review) {
        repository.appendReview(professorId, review);
    }
}