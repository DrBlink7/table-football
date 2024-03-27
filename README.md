# Table-Football Code Challenge
Hello table football players, with this web-app you can now create, delete, edit and browse the list of every player, you can even check their player page and analyze their personal stats.
You can create teams, but don't be a solo player! Choose a team name and a colleague to create your own team, you can even edit or delete it later, but what about browsing team stats? You can do that too!
Now the fun part, you can create a match and wait for the table to be free to start the match!  

## Introduction
The web-app has the required functionalities:
  - CRUD operations on players
  - CRUD operations on teams
  - CRUD operations on matches
  - Real-time matches (with SSE notifications)
  - Stats
    - Teams leaderboards (Rankings of ended matches)
    - Strikers Leaderboards (Rankings of ended matches)
    - Defenders Leaderboards (Rankings of ended matches)

The application also provides:
  - Players Stats Page (Rankings of ended matches)
  - Teams Stats Page (Rankings of ended matches)
  - i18-zation
  - User page (*Enhanced in future releases*)

Application rules:
  - A player cannot be deleted if he/she is in a team
  - A team (its players) cannot be edited if it is in a match
  - A team (its name) can be always edited
  - A team cannot be deleted if it is in a match
  - A team cannot be formed if striker/defender have the same player
  - A match can be created only if blue/red have 4 different players (4 different players id)
  - A match (its teams) can be edited only if its status is preparing
  - A match cannot be deleted if its status is ongoing
  - Only 1 Match can be ongoing (there is no real limitation on FE nor on BE nor on the technology choosed, i just added a fake rule on BE to fit the imaginary scenario where Molo has 1 table football available)
  - Teams leaderboards
    - points DESC
    - goal difference DESC
    - goals scored per match DESC
    - goals conceded ASC
  - Defender leaderboards
    - goals conceded per match ASC
    - goals conceded ASC
    - games played ASC
  - Striker leaderboards
    - goals scored per match DESC
    - goals scored DESC
    - games played ASC

## Structure
To develop this application created via [craco](https://craco.js.org/docs/) i used react typescript, react-router-dom and react-dom for navigation of the Single Page Application, react-hook-form as form handler used with the yup for its validation, axios to handle API calls, react-redux and @reduxjs/toolkit to handle the global state, crypto-js to handle crypting/decrypting of the redux state stored in the browser local storage, material-ui for the components styling with react-perfect-scrollbar. BE is a node App, db choosed is PostgreSQL.

Before launching the application, you need to create an .env file by copying the [env example](/backend/.env.example) file into a .env file for BE and [env example](/frontend/.env.example) file into a .env file for FE.

These files (and a tl;dr version of the documentation/how to) will be provided in a .zip via mail.

Table-football can be launched by using Docker Compose (or with yarn if you're not into docker.)

More about [FE Structure](/frontend/README.md#structure), more about [BE Structure](/backend/README.md#structure)

# Docker run Prerequisite

- Docker desktop (for Windows/Mac users)
- Docker (for Linux users)

# Running the Application

If you don't want unnecessary node modules, installing the required Node version / NVM, yarn/npm and every other dependencies, you can just open a terminal in the repo root and run the command:
```bash
docker compose up --build
```
The `node:lts-alpine` container image will be downloaded, and the commands in the Frontend [Dockerfile](/frontend/Dockerfile) and Backend [Dockerfile](/backend/Dockerfile) will be executed.

Once the backend is up and running, you will see these messages into the terminal log (the terminal where you ran the docker compose command)
```bash
backend-molo   | { event: 'Logger initialized' }
backend-molo   | {
backend-molo   |   client: {
backend-molo   |     cloudRole: 'backend',
backend-molo   |     applicationVersion: '0.0.1',
backend-molo   |     cloudRoleInstance: 'dev'
backend-molo   |   }
backend-molo   | }
backend-molo   | { event: 'Backend is listening on port 3001' }
```
Now that backend is ready (and this is the first launch of the app on your environment) you need to run the migrations against the db.

To do that you just need to run, from a shell running from backend folder, this command
```bash
DATABASE_URL=postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME yarn run migrate up
```
(N.B. you can launch it on every docker-run anyway, if no db update needed no migration will run)

Once the migrations are executed and the whole environment is up&running, you just need to open a [browser](http://localhost:3000) to navigate into the app.
You can find more info on migrations on BE [README](/backend/README.md#db-migration).

You can browse the API documentation with the [Swagger UI](http://localhost:3001/swagger/) where you can test all the APIs directly from the BE without the need of the FE application. You can find more info on swagger on BE [README](/backend/README.md#swagger-ui).

## Close application
To stop the container execution, you just need to click Ctrl+C (or Command+C on Mac) and then the write command:
```bash
docker compose down
```

## Changing env / deploying the app
docker-compose.yml is targeting both FE and BE images to **development** to run a production build you will need to change it with a docker-compose override (or simply change it manually).

*Deployment procedure is still in progress*

## Tests

There are 3 different tests modules, 2 on frontend and 1 on backend application

### Frontend test
I added 2 different type of tests suite
- data manipulation with Jest 
-  end-to-end test cases and automated Component testing wit Cypress

To run the jest tests suite you just need to open a terminal in the frontend folder and run the command:
```bash
yarn run test
```
To run the cypress automated tests you need to open a terminal in the frontend folder and run the command:
```bash
yarn run cypress run
```
this will run all E2E tests i added, but not the Component Test, so if you're interested into Cypress Tests you can find more information about Cypress tests and how to run it on FE [README](/frontend/README.md#tests).

### Backend test
To run the test, open a terminal in the backend folder and run the command:
```bash
yarn run test
```
you can find more info on BE tests in [README](/backend/README.md#tests).
