Backend [NestJS (Express), GraphQL, TypeORM, PostgreSQL] for a roller coaster ranking platform.

# Getting started

## Installation

Clone the repository:

    git clone https://github.com/ajdhefley/coaster-ranker-api

Open the repository folder:

    cd coaster-ranker-api
    
Install the dependencies:
    
    npm install

Build the application:
    
    npm run build
    
----------

## NPM scripts

- `npm start` - Start application
- `npm run start:dev` - Start application with watcher
- `npm run build` - Build application
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end (live) tests
- `npm run lint` - Run linter

- `npm run tools:scraper` - Run tool to scrape coaster data/images and save to DB
- `npm run tools:encoder` - Run tool to generate Base64 encoded strings for each image

----------

## Environment variables

- `DB_NAME` - Name of database
- `DB_HOST` - DB server host (does not include port)
- `DB_USER` - DB server username
- `DB_PASSWORD` - DB server password
- `PORT` - Port on which API is hosted
- `GOOGLE_CLIENT_ID`
- `GOOGLE_SECRET`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`

----------

## Start application

- `npm start`
- `npm run start:dev` will automatically rebuild when files are changed
      
