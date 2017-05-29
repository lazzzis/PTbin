FROM node:7.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --only production

COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "run", "start" ]
