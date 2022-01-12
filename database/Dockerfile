FROM mongo:4.4.0

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD password
ENV MONGO_INITDB_DATABASE teepee

ADD ./mongo-init.js /docker-entrypoint-initdb.d/

RUN mkdir -p /usr/app/db/
WORKDIR /usr/app/db/