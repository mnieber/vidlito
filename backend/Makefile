#
# Postgres
#

create-db:
	PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -d postgres -U postgres -c "CREATE USER ${DJANGO_DATABASE_USER} WITH CREATEDB PASSWORD '${DJANGO_DATABASE_PASSWORD}';" || true
	PGPASSWORD=${DJANGO_DATABASE_PASSWORD} psql -h ${POSTGRES_HOST} -d postgres -U ${DJANGO_DATABASE_USER} -c "CREATE DATABASE ${DJANGO_DATABASE_NAME};" || true
	PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -d postgres -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${DJANGO_DATABASE_NAME} TO ${DJANGO_DATABASE_USER};"

pgcli:
	pgcli `python manage.py sqldsn --quiet --style=uri`

#
# Python
#

install:
	pip install -r .requirements/dev.txt

pip-compile:
	pip-compile .requirements/base.in -o .requirements/base.txt
	pip-compile .requirements/dev.in -o .requirements/dev.txt

#
# Django
#

collect-static:
	python manage.py collectstatic --link

create-superuser:
	python manage.py createsuperuser --noinput || true

make-migrations-users:
	python manage.py makemigrations users

migrate:
	python manage.py migrate

run-server:
	python manage.py runserver 0.0.0.0:8000

uninstall-editable-packages:
	pip uninstall --yes django-rtk
	pip uninstall --yes django-rtk-later
	pip uninstall --yes django-rtk-password
	pip uninstall --yes django-rtk-magic-link
	pip uninstall --yes django-rtk-green

install-editable-packages: uninstall-editable-packages
	pip install -e /pypi/django-rtk
	pip install -e /pypi/django-rtk-later
	pip install -e /pypi/django-rtk-password
	pip install -e /pypi/django-rtk-magic-link
	pip install -e /pypi/django-rtk-green

#
# Stack
#

init-dev: \
	create-db \
	pip-compile \
	install \
	make-migrations-users \
	migrate \
	collect-static \
	create-superuser
