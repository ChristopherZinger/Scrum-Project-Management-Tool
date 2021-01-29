# Getting Started with Create React App

Boiler plate for application with Typescript, React, Apollo-Client, Apollo-Server-Express, Express, Type-Graphql

### Prerequirements

docker
docker-compost
postgres (https://hub.docker.com/_/postgres)

### Get Started

**Instalation**

- npm i
- cd server && npm i
- **/server:** docker-composet up
- **/server:** docker exec -it psql -U postgres
- **>>>** CREATE DATABASE noteexchangedb;

**Launching**

- **/server:** docker-composet up
- **/server:** npm run devstart
- **/:** npm run graphql:codegen:watch
- **/:** npm run start
