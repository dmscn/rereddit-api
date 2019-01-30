FROM node:10.15-stretch as baseImage
WORKDIR /usr/dist
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
RUN apt-get update && apt-get install -y `cat requirements.apt`

FROM baseImage as developer
ENV PORT 3000
EXPOSE ${PORT}
RUN yarn install
CMD ["yarn", "dev"]

FROM baseImage as production
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["yarn", "start"]
