<h1 align="center">iRated</h1>
<h3 align="center">San Jose State University</h3>
<h3 align="center">Enterprise Software - CMPE172/Spring 2020 Project</h3>

## Team 9

Ahmed Darkazanli, Ryan Ly, Vincent Truong

## Project Description

iRated is a three-tier, highly scalable web application that seeks to provide students with a prospective professor’s ratings before taking the course. Each professor in the database will have an overall rating comprised of reviews from previous students, each containing genuine insights about the overview of the course. With iRated, the uncertainty of choice will be minimal and will be able to help match up student learning styles with the teaching styles of professors.

## Video Demo:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=vm9ttYwDIKg" target="_blank"><img src="https://i.ytimg.com/vi/vm9ttYwDIKg/maxresdefault.jpg" alt="iRated Project" width="240" height="180" /></a>

## Prerequisites

Node, Maven, Docker, Java 8 installed.

Setting up the DynamoDB database:
1. Create an AWS account
2. Create IAM user to get Secret and Access Keys
3. Create a “professor” table with partition key “professorId” (String) in dynamodb console

## Env variables
In rest/src/main/resources/ directory, create a `application.properties` file and insert the following AWS credentials: 

```
amazon.aws.accesskey= (Add your personal AccessKey)
amazon.aws.secretkey= (Add your personal SecretKey)
```

## Running the Project Locally

Starting the front-end:
1. Start the dev server by running `npm start`

Running dockerized springboot to work as a REST api:
1. CD into `rest/`
2. Ensure your credentials are in `application.properties`
2. Run `mvn install` to generate jar file
3. Run `docker build -t rest.jar .` to build image
4. Run `docker run -p 8080:8080 rest.jar` to create and start a container


*Note: In order to add a new professor to the database, send a POST request to http://localhost:8080/dynamoDb with the following JSON schema:*

```
{
    "professorName" : <String>,
    "college": <String>,
    "department": <String>,
}
```

## App Screenshots

Homepage: Landing page of the application upon starting development server
![ScreenShot](https://user-images.githubusercontent.com/29168903/81484739-f5cf2180-91fc-11ea-8e1e-ec411e7a7eef.png)

Searching for professor: Dropdown containing search results of the input
![ScreenShot](https://user-images.githubusercontent.com/29168903/81484740-f8ca1200-91fc-11ea-8431-270da17d7cd0.png)

Professor Page: Displays professor ratings and reviews
![ScreenShot](https://user-images.githubusercontent.com/29168903/81484742-fb2c6c00-91fc-11ea-913a-fdac3bad6f43.png)

Adding a new Review: Popup Modal allows users to enter anonymous reviews
![ScreenShot](https://user-images.githubusercontent.com/29168903/81484748-fff12000-91fc-11ea-81f6-f6a71fd68237.png)
