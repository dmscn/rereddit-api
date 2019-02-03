FROM node:10.15-slim as baseImage
WORKDIR /app
ADD . ${WORKDIR}
RUN apt-get update && apt-get install -y `cat requirements.apt`

FROM baseImage as development
RUN cp .env.default .env
ENV PORT 3000
EXPOSE ${PORT}
RUN yarn
CMD ["yarn", "dev"]

FROM baseImage as production
RUN yarn install --production=true
RUN yarn build
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["yarn", "start"]
