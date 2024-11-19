# Category Management API

The **Category Management API** is a backend service designed to allow vendors to organize products into a hierarchical structure. This project is built using Node.js, TypeScript, and Prisma, and it uses PostgreSQL as the database.

---

## Features

- **Create, Read, Update, Delete (CRUD) Categories** with hierarchical relationships.
- Swagger documentation accessible at `/category/v1/api-docs`.
- Test coverage using Jest.
- Automated database migrations using Prisma.
- Dockerized setup for local development and production.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **TypeScript**: For type-safe development.
- **Express.js**: Web framework for handling API routes.
- **Prisma**: ORM for managing database schema and queries.
- **PostgreSQL**: Relational database.
- **Joi**: Schema validation.
- **Swagger UI Express**: API documentation.
- **Docker**: Containerized development environment.

---

## Prerequisites

Ensure the following tools are installed on your machine:

1. [Docker](https://www.docker.com/): To run the services in containers.
2. [Node.js](https://nodejs.org/) (v20 or higher): For local development.
3. [npm](https://www.npmjs.com/): Package manager for JavaScript.

---

## Running the Application Locally

### Step 1: Clone the Repository

```bash
git clone https://github.com/faelneves/category-management.git
cd category-management
```

### Step 2: Create an Environment File

Create a .env file in the root directory coping the `sample.env` file:

### Step 3: Start the Application with Docker Compose

Run the following command to start the PostgreSQL database and API:

```bash
docker-compose -f development/docker-compose.yml up
```

This will:

- Start a PostgreSQL instance on port `5432`.
- Start the Category API on port `3000`.

### Step 4: Access the API

- Base URL: http://localhost:3000
- Swagger Documentation: http://localhost:3000/category/v1/api-docs

## Testing

- Run all tests:

```bash
npm test
```

- Run unit tests only:

```bash
npm run test:unit
```

- Run integration tests only:

```bash
npm run test:integration
```

- Run with coverage:

```bash
npm run test:coverage
```

## Author

### Rafael Neves

Feel free to contribute to this project by opening issues or submitting pull requests!
