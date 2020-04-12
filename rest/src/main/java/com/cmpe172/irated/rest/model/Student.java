package com.cmpe172.irated.rest.model;

import java.io.Serializable;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "student")
public class Student implements Serializable{
    private static final long serialVersionUID = 1L;

    private String studentId;
    private String firstName;
    private String lastName;
    private String age;
    //private String address;

    @DynamoDBHashKey(attributeName = "studentId")
    @DynamoDBAutoGeneratedKey
    public String getStudentId(){
        return studentId;
    }

    public void setStudentId(String studentId){
        this.studentId = studentId;
    }

    @DynamoDBAttribute
    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    @DynamoDBRangeKey
    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    @DynamoDBAttribute
    public String getAge(){
        return age;
    }

    public void setAge(String age){
        this.age = age;
    }
}