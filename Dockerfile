FROM node:alpine

RUN apk update && apk upgrade

RUN apk add --no-cache --virtual .gyp python make g++
RUN apk add fftw-dev

RUN apk add vips-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

LABEL name "image-service"

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --production

COPY src/ /app/src

EXPOSE 3000
CMD ["npm", "start"]
