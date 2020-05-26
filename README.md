# Event Planner

# Getting Started
* Clone the repo
* run <code> npm run setup</code> to download the dependenices of the backend and frontend
To run the App, follow the following steps:
1. change the directory to /backend
2. run the command **node index**
3. open another terminal
4. change the directory to /client
5. run the command **npm start**

# Docker


* The Backend and Forntend are Dockerized and can be run through **docker-compose up** but you have to make sure that you have docker installed.

* You can also build through **docker-compose build**

* You can stop running **docker-compose down**

* The backend runs on port 5000 and the Frontend runs on port 3000

* *docker-compose.yml* runs the two docker files(one for backend and another for frontend)

* The Docker file for backend runs commands **npm i** to install dependencies and **node index** to run the backend in *./Backend* directory

*The Docker file for frontend runs commands **npm i** to install dependencies and **npm start** to run the front in *./client* directory



