INTERACTIVE=$(shell [ -t 0 ] && echo i || echo d)
APPDIR=/usr
PWD=$(shell pwd)
PORT=8019
CONTAINER_NAME=forum-api
DOCKER_CONTEXT=.
DOCKER_STAGE ?= developer
version := patch

welcome:
	@printf "\033[33m  _____                               _    ____ ___  			\n"
	@printf "\033[33m |  ___|__  _ __ _   _ _ __ ___      / \  |  _ \_ _| 			\n"
	@printf "\033[33m | |_ / _ \| '__| | | | '_ \` _ \\    / _ \\ | |_) | |  		\n"
	@printf "\033[33m |  _| (_) | |  | |_| | | | | | |  / ___ \\|  __/| |  			\n"
	@printf "\033[33m |_|  \\___/|_|   \\__,_|_| |_| |_| /_/   \\_\\_|  |___| 	\n"
	@printf "\033[33m                                                     			\n"

setup: welcome build-docker-image
ifeq ($(shell test -f ./.env || echo "no"),no)
	@cp .env.default .env
endif
	@docker run --name ${CONTAINER_NAME} --rm -p ${PORT}:8019 -v ${PWD}:${APPDIR} dmscn/${CONTAINER_NAME} yarn

start: welcome check-if-docker-image-exists
	@echo "Starting app on port ${PORT}"
	@docker run -t${INTERACTIVE} --name ${CONTAINER_NAME} --rm -p ${PORT}:8019 -v ${PWD}:${APPDIR} dmscn/${CONTAINER_NAME}


stop: 
	@echo "Stoping ${CONTAINER_NAME}"
	@docker stop ${CONTAINER_NAME}

exec: 
	@docker exec -it $(docker ps -aqf "name=dmscn/${CONTAINER_NAME}") /bin/bash

logs: 
	@docker logs $(docker ps -aqf "name=dmscn/${CONTAINER_NAME}")

check-if-docker-image-exists:
ifeq ($(shell docker images -q dmscn/$(CONTAINER_NAME):latest 2> /dev/null | wc -l),0)
	@echo "Docker image not found, building Docker image first"; sleep 2;
	@make build-docker-image
endif

build-docker-image:
	@echo "Building docker image from Dockerfile"
	@docker build --target ${DOCKER_STAGE} -t dmscn/${CONTAINER_NAME} ${DOCKER_CONTEXT}




