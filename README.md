# Vidlito

A stack with a Django backend (`src/services/vidlito_be`), a React frontend (`src/services/vidlito_fe`) and
PostgreSQL, which run in Docker containers. You operate the stack with `jaz` targets: run them from this directory.
`jaz --list-all` lists them.

## Requirements

- `jaz` (jazzoo), with `expandvars` installed next to it (`pip install expandvars`)
- `docker` with compose, `uv` and `tmux`

## First time: initialise the stack

Create `env/local/secrets.env` (it is not checked in) with the secrets of the env files:

```
VIDLITO_BE_DJANGO_DATABASE_PASSWORD=...
VIDLITO_BE_DJANGO_SECRET_KEY=...
VIDLITO_BE_DJANGO_SUPERUSER_PASSWORD=...
VIDLITO_BE_DJANGO_VIDLITO_PASSWORD=...
POSTGRES_PASSWORD=...
```

Build the images, and then initialise the stack:

```
$ jaz compose.build-base-images
$ jaz compose.build
$ jaz compose.init
```

`compose.init` prepares every service for development (it creates the database, runs the migrations, creates the
superuser and installs the node modules), starts the servers and waits until the stack is healthy. Then it checks
the homepage (http://localhost:4000/) and offers to open it in the browser.

## Day to day: start the services by hand

```
$ jaz compose.up       # start the containers (the servers don't run yet)
$ jaz tmux             # in another terminal: open the tmux session, and pick the servers to run
```

To work in a container, open its shell, or run a command in it:

```
$ jaz be.shell
$ jaz fe.shell
$ jaz be.exec "python manage.py check"
```

`jaz compose.down` stops the stack. `jaz compose.down volumes=true` also removes its volumes (e.g. the database).

After changing `requirements.in`, run `jaz compose.restart` (it compiles the requirements and rebuilds the images).

## Configuration

The config is in `env/local/config/base.yaml`. Put your own settings in `env/local/config/local.yaml`, which
overrides it and is not checked in, e.g.:

```yaml
docker:
  shell: fish
compose:
  use_dockerfile_local: true
```

Your own volume mounts (e.g. the jazzoo checkout, editable packages, fish history) go in
`env/local/docker/docker-compose.override.yml`, which is not checked in either. The services install the jazzoo
stub in `src/libs/jazzoo`, so `jaz` only works in the containers when this file mounts the real jazzoo code over
`/app/libs/jazzoo`.

`jaz config.print` prints the merged config, and `jaz config.edit` opens the config files.
