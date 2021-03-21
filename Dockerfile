# Dockerfile is a blueprint for building a docker image
# Docker image is a template for running Docker containers
# Docker containers are just a running process

# Node version 14 base image
FROM node:14

# RUN
# ADD

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV PORT = 8080

EXPOSE 8080

CMD ["npm", "start"]