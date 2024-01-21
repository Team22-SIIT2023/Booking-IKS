# TravelBee
### Description
This application is an application that allows users to search and book accommodation (similar to Booking). 
Book a spot in the hive.  :bee:


### Running a project
Clone these repositories:
`https://github.com/Team22-SIIT2023/Booking-IKS.git`
`https://github.com/Team22-SIIT2023/Booking-ISS.git`

Run frontend:
`npm install`
`ng serve`

Frontend runs on local port 4200
Backend runs on local port 8080


### Team
| Student 1 | Student 2 | Student 3 | 
| -------- | -------- | -------- | 
| Valentina Jevtic | Isidora Aleksic | Sonja Baljicki |
| SV11/2021 | SV36/2021 | SV59/2021 |


### Structure
TravelBee consist of 5 classes that we took this semester:
-   Software Frontend Engenieering
-   Software Backend Engenieering
-   Mobile Application Engenieering
-   Software Tests Engenieering
-   Software development methodologies


#### Backend
We developed backend for this app in Java Spring Boot framework. There are 3 different roles in the system: admin, host and guest. Users can register as guests and hosts. For authentication and authorization we used JWT. The database we used for this project - PostgreSQL.


#### Frontend
We developed the frontend for this app in Angular framework. For communication with the backend we used HttpClient and for notifications WebSockets.


#### Testing 
The backend was tested with JUnit5 tests for services, repositories and controllers as well as Selenium for e2e testing. The frontend was tested with Jasmin and Karma.
