# SCRUM app

Manage your project with SCRUM.

### Prerequirements

docker
docker-compost
postgres (https://hub.docker.com/_/postgres)

### Get Started

**Prep**

- copy \*.example files (.env, ormconfig.json) and write values

**Instalation**

- npm i
- cd server && npm i
- **/server:** docker-composet up
- **/server:** docker exec -it psql -U postgres
- **>>>** CREATE DATABASE db-name;

**Launching**

- **/server:** docker-composet up
- **/server:** npm run devstart
- **/:** npm run graphql:codegen:watch
- **/:** npm run start
