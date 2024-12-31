# lumio
It is full stack web application that uses React on the frontend an Django on the back end.
The purpose of the app is to help users with tasks managemnt, having bunch of useful features 
## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/staaceyD/lumio
   ```

2. Install dependencies and activate virtural env for the back end:

    ```bash
    make init-be
    ```

3. Now you can run backend dev server:
    
    ```bash
    make start-be
    ```

4. Install dependencies for the frontend:

    ```bash
    make init-fe
    ```
5. Run frontend dev server:
    
    ```bash
    make start-fe
    ```

## API Endpoints

The full list of endpoints can be found in `openapi.yml` file

## Swagger Documentation

The Swagger documentation for this API is generated using drf-spectacular.

Visit the Swagger UI at: http://127.0.0.1:8000/schema/swagger-ui/

To download the schema visit http://127.0.0.1:8000/schema

Or, explore the JSON schema at: http://127.0.0.1:8000/schema/swagger/?format=openapi

To generate updated file use the following command:

```bash
make gen-api-docs
```

<!-- TODO -->
## Linting

It's highly recommended that you install the pre-commit hook - this will
automatically lint your code each time you commit.

From the root of the project do this:

brew install pre-commit
pre-commit install
