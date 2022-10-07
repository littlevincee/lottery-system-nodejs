# Prerequisite

1) nodejs version 16+
2) Postgres

## Running the project

To start the application in debug mode:
`npm run start:debug`

To start the application normally:
`npm run start`

## Migration

The migration will run automatically once postgres database is successfully connected.

Create an .env file with the following params, assign the value according to postgres setup:
`TYPEORM_HOST`
`TYPEORM_PORT`
`TYPEORM_USERNAME`
`TYPEORM_PASSWORD`
`TYPEORM_DATABASE`
