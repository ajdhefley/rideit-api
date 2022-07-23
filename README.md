API gateway [Node.js, NestJS (Express), GraphQL] for a roller coaster enthusiast platform.

Handles authentication (including Google & Facebook OAuth) and positions GraphQL between client and microservices. Also contains tools to populate raw coaster data, and mock data for performance/UI testing.

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

| Name | Description |
| :--- | :--- |
| `npm start` | Starts application |
| `npm run start:dev` | Starts application with watcher (automatically rebuilds changed files) |
| `npm run build` | Builds application |
| `npm run test` | Runs unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Runs linter (static code analysis) |
| `npm run tools:scraper` | Runs Coaster Scraper tool |
| `npm run tools:encoder` | Runs Image Encoder tool |
| `npm run tools:mock` | Runs Mock Data Creator tool |

----------

## Tools

| Name | Description |
| :--- | :--- |
| Coaster Scraper | Executes search on rcdb.com, and scans and stores data/images for thousands of coasters |
| Image Encoder | Iterates through all images for all coasters and stores Base64 encodings, to be used as blurred placeholder images |
| Mock Data Creator | Generates and stores fake comments and reviews for all coasters |