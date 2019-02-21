APPDIR=/usr/src/forum-api
PWD=$(shell pwd)
PORT=3000
CONTAINER_NAME=forum-api
DOCKER_CONTEXT=.
DOCKER_STAGE ?= development

welcome:
	@printf "\033[33m  _____                               _    ____ ___  			\n"
	@printf "\033[33m |  ___|__  _ __ _   _ _ __ ___      / \  |  _ \_ _| 			\n"
	@printf "\033[33m | |_ / _ \| '__| | | | '_ \` _ \\    / _ \\ | |_) | |  		\n"
	@printf "\033[33m |  _| (_) | |  | |_| | | | | | |  / ___ \\|  __/| |  			\n"
	@printf "\033[33m |_|  \\___/|_|   \\__,_|_| |_| |_| /_/   \\_\\_|  |___| 	\n"
	@printf "\033[0m                                                            \n"

setup: welcome build-docker-image
ifeq ($(shell test -f ./.env || echo "no"),no)
	@cp .env.default .env
endif
	@make start 

start: welcome check-if-docker-image-exists
	@echo "Starting app on port ${PORT}"
	@docker run -t --name ${CONTAINER_NAME} --rm -p ${PORT}:8019 dmscn/${CONTAINER_NAME}


stop: 
	@echo "Stoping ${CONTAINER_NAME}"
	@docker stop ${CONTAINER_NAME}

exec: 
	@docker run -it dmscn/${CONTAINER_NAME} bash

logs: 
	@docker logs $(docker ps -aqf "name=dmscn/${CONTAINER_NAME}")

check-if-docker-image-exists:
ifeq ($(shell docker images -q dmscn/$(CONTAINER_NAME):latest 2> /dev/null | wc -l),0)
	@echo "Docker image not found, building Docker image first"; sleep 2;
	@make build-docker-image
endif

build-docker-image:
	@printf "\033[33m  Building docker image from Dockerfile \n"
	@printf "\033[0m\n"
	@docker build --target ${DOCKER_STAGE} -t dmscn/${CONTAINER_NAME} ${DOCKER_CONTEXT}
