package com.cmpe172.irated.rest.repository;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.cmpe172.irated.rest.model.Professor;
import com.cmpe172.irated.rest.model.Review;

@Repository
public class DynamoDbRepository {
    public static final Logger LOGGER = LoggerFactory.getLogger(DynamoDbRepository.class);

    @Autowired
    private DynamoDBMapper mapper;

    public void insertProfessorIntoDB(Professor professor) {
    		professor.setProfessorName(professor.getProfessorName().toLowerCase());
        mapper.save(professor);
    }

    public Professor getProfessorDetails(String professorId) {
        return mapper.load(Professor.class, professorId);
    }
    
    public PaginatedScanList<Professor> getProfessorsByName(String name) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val", new AttributeValue().withS(name));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
            .withFilterExpression("contains(professorName, :val)").withExpressionAttributeValues(eav);

        PaginatedScanList<Professor> scanResult = mapper.scan(Professor.class, scanExpression);
        
        return scanResult;
    }

    public void appendReview(String professorId, Review review) {
        try {
            Professor professor = mapper.load(Professor.class, professorId);
            Review newReview = new Review();
            newReview.setContent(review.getContent());
            newReview.setRating(review.getRating());
            professor.getReviews().add(newReview);
            mapper.save(professor, buildDBSaveExpression(professor));
        } catch (ConditionalCheckFailedException exception) {
            LOGGER.error("invalid data - " + exception.getMessage());
        }
    }

    public DynamoDBSaveExpression buildDBSaveExpression(Professor professor) {
        DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression();
        Map<String, ExpectedAttributeValue> expectedId = new HashMap<>();
        expectedId.put("professorId", new ExpectedAttributeValue(new AttributeValue(professor.getProfessorId()))
                .withComparisonOperator(ComparisonOperator.EQ));
        saveExpression.setExpected(expectedId);
        return saveExpression;
    }
}