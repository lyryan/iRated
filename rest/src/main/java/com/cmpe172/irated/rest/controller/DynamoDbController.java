package com.cmpe172.irated.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.cmpe172.irated.rest.model.Professor;
import com.cmpe172.irated.rest.model.Review;
import com.cmpe172.irated.rest.repository.DynamoDbRepository;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "*")
@RestController
public class DynamoDbController {
    @Autowired
    private DynamoDbRepository repository;

    @RequestMapping(value = "/dynamoDb", method = RequestMethod.POST)
    public String insertProfessorIntoDB(@RequestBody Professor professor) {
        repository.insertProfessorIntoDB(professor);
        return "Successfully inserted Professor into DynamoDB table";
    }

    @RequestMapping(value = "/dynamoDb", params = "professorId", method = RequestMethod.GET)
    public ResponseEntity<Professor> getProfessorDetails(@RequestParam String professorId) {
        Professor professor = repository.getProfessorDetails(professorId);
        return new ResponseEntity<Professor>(professor, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/dynamoDb", params = "name", method = RequestMethod.GET)
    public PaginatedScanList<Professor> getProfessorsByName(@RequestParam String name) {
    		return repository.getProfessorsByName(name);
    }

    @RequestMapping(value = "/dynamoDb", method = RequestMethod.PUT)
    public ResponseEntity<Review> appendReview(@RequestParam String professorId, @RequestBody Review review) {
        Review newReview = repository.appendReview(professorId, review);
        return new ResponseEntity<Review>(newReview, HttpStatus.OK);
    }
}