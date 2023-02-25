ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

init-dev:
	pip install compile-env==0.4.1

compile-env:
	cd ${ROOT_DIR}/env/dev && compile-env env-spec.yaml

create-opt-paths:
	sudo mkdir -p /opt/vidlito/backend
	sudo echo     "- cmd: echo "start of the fish history" >> /opt/vidlito/backend/fish_history
	sudo mkdir -p /opt/vidlito/backend/ipython
	sudo mkdir -p /opt/vidlito/backend/assets
	sudo touch    /opt/vidlito/backend/pytest_report.html
	sudo mkdir -p /opt/vidlito/backend/media
	sudo mkdir -p /opt/vidlito/backend/static
	sudo mkdir -p /opt/vidlito/frontend
	sudo echo     "- cmd: echo "start of the fish history" >> /opt/vidlito/frontend/fish_history
