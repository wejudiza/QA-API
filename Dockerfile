# Dockerfile is a blueprint for building a docker image
# Docker image is a template for running Docker containers
# Docker containers are just a running process

# Node version 14 base image
FROM node:14

# Telling docker to run all commands from /app WORKDIR
# Typically you have one WORKDIR per layer
WORKDIR usr/app

# RUN mkdir /app
# ADD . /app
# WORKDIR /app
COPY package*.json ./

RUN npm install

# copying every file from source to the app WORKDIR
COPY . .

# ENV port = 8080
# ENV MONGO_HOST "host.docker.internal"

# EXPOSE 27017

# Expose tells Docker instance to listen for requests on Docker container's PORT on 8080
EXPOSE 8080

CMD ["npm", "start"]