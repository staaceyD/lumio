init-be:
	poetry shell; poetry install; pre-commit install; poetry run python core/manage.py migrate

start-be:
	poetry run python core/manage.py runserver

migrate:
	poetry run python core/manage.py makemigrations; poetry run python core/manage.py migrate
	
init-fe:
	cd frontend; npm install; npm run build

start-fe:
	cd frontend; npm run dev;

gen-api-docs:
	poetry run python core/manage.py spectacular --color --file openapi.yml

test-be:
	poetry run python core/manage.py test core

lint-be:
	poetry run isort --check-only --profile black --project core --skip-glob '*/migrations/*' core/
	poetry run black --check --exclude '.*migrations/.*' core/

format-be:
	poetry run isort --profile black --project core --skip-glob '*/migrations/*' core/
	poetry run black --exclude '.*migrations/.*' core/
