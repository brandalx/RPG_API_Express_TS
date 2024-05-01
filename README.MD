# Neo Home assigment Brandon Nolan

## Description

This project is a backend system for a new role-playing game, focusing on managing characters and controlling game flow. It includes API endpoints for character creation, listing, and detailed views, along with a combat system simulation. The API is developed with Express.js and TypeScript. This project also contains unit tests with Jest for all controllers, API documentation with swagger for all routes, and its ready for deploy via Docker or regular build. Application in type safe and scalable.

## Git workflow

This project was built using the [Git Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) workflow. workflow. That means this bundle includes all commits and branches that are being used in the development process.

## Techonologies and libraries used

- **Express.js**: Core web application framework for building APIs.
- **TypeScript**: Language that adds static types to JavaScript for better maintainability and developer experience.
- **Jest**: Testing framework for JavaScript, used for writing unit and integration tests.
- **Nodemon**: Utility that automatically restarts the server when file changes in the directory are detected.
- **Swagger-jsdoc** and **Swagger-ui-express**: Tools for generating and displaying Swagger documentation for the API endpoints.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Cors**: Enables CORS (Cross-Origin Resource Sharing) to allow/restrict resources on a web server based on where the HTTP request was initiated.
- **Joi**: Library for powerful data validation.
- **UUID**: Provides utilities to generate universally unique identifiers.
- **Module-alias**: Allows creating custom path aliases for modules.
- **TS-Jest**: TypeScript preprocessor with source map support for Jest.
- **Tsconfig-paths** and **tsconfig-paths-jest**: Handle custom paths in TypeScript configuration to align with module aliasing.
- **ts-node**: Executes TypeScript directly in Node.js without pre-compilation.

## API Game Features

- **F1 - Character Creation**: Create a new character with a specified name and job.
- **F2 - Character List**: View all characters by name and job.
- **F3 - Character Details**: View detailed info about a character.
- **F4 - Battle**: Simulate a battle between two characters.
- \*\*F5 (bonuses) - Additional validation checks for cases of wrong data submissions to ensure security and scalability of the application.

## Installation

Install the project dependencies using:

```bash
yarn install
# or
npm install
```

## Running the Application

### Running the Application in development mode

To run the application in `development mode`:

1. Ensure that `_moduleAliases` in `package.json` are set to `"@": "src"`, Then run:
   ```bash
   yarn dev
   ```
2. It will run application in development mode with `nodemon` and will watch for every change of the file.

### Running the Application in production mode

To run the application in `production mode` or use it in the future for Docker image and container you **have** to, follow these steps:

1. Change `_moduleAliases` in `package.json` to `"@": "dist"`.
2. Compile the TypeScript files:
   ```bash
   yarn build
   # or
   npm run build
   ```
3. Navigate to created production folder:
   ```bash
   cd dist
   ```
4. Start the application:
   ```bash
   yarn start
   # or
   npm start
   ```

## Using Docker

To run the application using Docker, follow these steps:

1. Change `_moduleAliases` in `package.json` to `"@": "dist"`.
2. Build the Docker image:
   ```bash
   docker build -t neo .
   ```
3. Run the Docker container:
   ```bash
   docker run -d -p 3001:3001 --name neo-container -e PORT=3001 neo
   ```

## Running Unit Tests with Jest

Run Jest unit tests **in development mode** with:

```bash
yarn test
# or
npm test
```

## API Documentation

Access the API documentation at `http://localhost:3001/api-docs`.
If you had changed the default port from `3001` to any other via `.env`, make sure to follow this port in your **url**

##Future updates and releases:

The app itself has a lot of comments for almost every part of it for almsot any potential question.

This is a scalable application based on the separation of concerns architecture. That means you can easily scale it, add new routes, integrate new tests, validations, routes, controllers, and more. Make sure to keep the architecture as it is unless some necessary changes are required. For all questions, feel free to contact me.

## Author

### Brandon Nolan

[My portfolio](https://brandnolandev.com)

[My GitHub](https://github.com/brandalx)

Assigment finished at: Apr, 30, 2024
