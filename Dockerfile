FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g gatsby-cli

RUN npm install

COPY . .

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]