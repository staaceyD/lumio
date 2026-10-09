# lumio

A full-stack task management app: React on the frontend, Django REST Framework on
the backend.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Linting](#linting)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/staaceyD/lumio
   ```

2. Install dependencies and activate the virtual env for the backend:

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

## Configuration

`SECRET_KEY`, `DEBUG` and `ALLOWED_HOSTS` are read from the environment, and the
defaults in `core/core/settings.py` are development-only. The dev server runs
without any configuration; to override, copy the example file and edit it:

```bash
cp .env.example .env
```

| Variable | Default | Notes |
| --- | --- | --- |
| `SECRET_KEY` | `django-insecure-change-me` | Set to a real random value outside development. |
| `DEBUG` | `true` | Any value other than `true` turns it off. |
| `ALLOWED_HOSTS` | empty | Comma-separated, e.g. `example.com,www.example.com`. |

`.env` belongs at the repo root and is gitignored; `.env.example` is the tracked
template.

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

## Linting

It's highly recommended that you install the pre-commit hook - this will
automatically lint your code each time you commit.

From the root of the project do this:

```bash
brew install pre-commit
pre-commit install
```

The same checks run in CI on every push and pull request. To run them yourself:

```bash
make lint-be     # check formatting
make format-be   # apply it
make test-be     # Django test suite
```
