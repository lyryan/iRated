package com.cmpe172.irated.rest.config;

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.util.StringUtils;

@Configuration
public class DynamoDbConfig {
    /*@Value("${amazon.access.key}")
    private String awsAccessKey;*/

    @Value("${amazon.dynamodb.endpoint}")
    private String dBEndpoint;
  
    @Value("${amazon.aws.accesskey}")
    private String accessKey;
  
    @Value("${amazon.aws.secretkey}")
    private String secretKey;

    @Bean
    public DynamoDBMapper mapper(){
        return new DynamoDBMapper(amazonDynamoDBConfig());
    }

    /*@Bean
    public AmazonDynamoDB amazonDynamoDBConfig(){
        return AmazonDynamoDBClientBuilder.standard()
        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(dBEndpoint, "US_EAST_1"))
        .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
        .build();
    }*/

    @Bean
    public AmazonDynamoDB amazonDynamoDBConfig() {
      AmazonDynamoDB dynamoDB = new AmazonDynamoDBClient(amazonAWSCredentials());
  
      if (!StringUtils.isNullOrEmpty(dBEndpoint)) {
        dynamoDB.setEndpoint(dBEndpoint);
      }
  
      return dynamoDB;
    }
  
    @Bean
    public AWSCredentials amazonAWSCredentials() {
      return new BasicAWSCredentials(accessKey, secretKey);
    }
}