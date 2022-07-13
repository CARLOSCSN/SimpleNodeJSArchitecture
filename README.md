## Objective

The service aims to process the answer sheets, calculating the results of the candidates and providing some statistics. Third party companies can send these answer sheets to an HTTP endpoint as a CSV file and retrieve the results in a CSV from a second HTTP endpoint.


## Description

The solution was built on TypeScript, NestJS and TypeORM and uses an SQLite database called "db.sql" which is automatically generated at the project root.
To run this project you need to have nodejs installed. (https://nodejs.org/en/download/).


## Installation

After saving the project on the computer open the terminal and navigate to the root folder and execute the command below.  

```bash
$ npm install
```

Wait until all dependencies are downloaded and the process is finished.


## Running the app

Now to run the project, just run the command below in the terminal.

```bash
$ npm run start
```

## Information for testing the application

*** Step 01

  With the project running correctly, the database "db.sql" must be created in the root of the application,
  and an automatic process (seed) will be triggered to record the exams and the results in the database.

    EX202001 (10 questions) : 1-A, 2-C, 3-C, 4-A, 5-B, 6-B, 7-C, 8-A, 9-D, 10-A
    EX202002 (17 questions): 1-B, 2-D, 3-C, 4-C, 5-A, 6-D, 7-E, 8-E, 9-C, 10-A, 11:E, 12:C, 13:D, 14:E, 15:A, 16:B, 17:D
    EX202003 (20 questions): 1-B, 2-C, 3-E, 4-E, 5-A, 6-C, 7-D, 8-E, 9-A, 10-A, 11:E, 12:C, 13:B, 14:A, 15:B, 16:C, 17:A, 18:B, 19:B, 20:D
    EX202004 (12 questions): 1-E, 2-A, 3-C, 4-D, 5-E, 6-A, 7-A, 8:E, 9:C, 10:B, 11:A, 12:B

  to verify these exams inserted in the base, just make a GET request to the url: "http://localhost:8080/api/v1/exam".

*** Step 02

  Now we can send the answer sheet of certain candidates and exams, this file is CSV type and contains the exam information, questions and answers of the candidate.

  You can make a POST request to the url: "http://localhost:8080/api/v1/answer-sheet/upload" sending in the body of the request a 'form-data' with the
   .csv file attached. The file is located in this directory inside the src folder of the project. "src\files\sample-answer-sheet.csv".

  to check the answer sheet inserted in the base just make a GET request to the url: "http://localhost:8080/api/v1/answer-sheet".


*** Step 03

  Now we can generate a new .csv file which will contain the result and some candidate statistics.

  To download this file just make a POST request to the url: "http://localhost:8080/api/v1/answer-sheet/export-csv" sending in the body of
  request a 'JSON' with the Exam ID and the candidate's email. Example. 

  {
    "examId": "EX202001",
    "candidateEmail": "gcohen@company.com"
  }
