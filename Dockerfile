FROM node:10.15-slim as baseImage
WORKDIR /usr/forum-api
COPY ./package.json .
COPY ./yarn.lock .
COPY ./.env.default .
COPY ./.env .
RUN yarn

FROM baseImage as development
RUN cp .env.default .env
COPY ./src ./src
CMD ["yarn", "dev"]

FROM baseImage as production
RUN yarn build
COPY ./dist ./dist
CMD ["yarn", "start"]
