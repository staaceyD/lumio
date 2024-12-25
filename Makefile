init-be:
	poetry shell; poetry install; python3 core/manage.py migrate

start-be:
	python3 core/manage.py runserver

migrate:
	python3 core/manage.py makemigrations; python3 core/manage.py migrate
	
init-fe:
	cd frontend; npm install; npm run build

start-fe:
	cd frontend; npm run dev;

gen-api-docs:
	python3 core/manage.py spectacular --color --file openapi.yml