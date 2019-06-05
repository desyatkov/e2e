FROM node:8



WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8888
CMD [ "yarn", "test" ]
