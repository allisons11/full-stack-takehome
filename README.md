# Customer Database Application

Application to display data from the MongoDB `sample_analytics` database schema. Consists of an Apollo GraphQL server and a Next.js app.

## Running in development

From the root directory, run the following commands:

- `npm run install-deps` to install dependencies in the client and server apps
- `npm run dev` to spin up the client and server apps in development

## Using the application

Navigate to `localhost:3000` to view the Next.js app.

From the home page, click "Expand" on any customer to bring up their full profile with account information and transaction history.

## Testing

To run tests for the client and server, run `npm run test` from the root directory.

## Docker

To build a local docker image for the development environment:
`npm run docker-build-dev`

To spin up the application in a Docker container:
`npm run docker-dev:hot`
