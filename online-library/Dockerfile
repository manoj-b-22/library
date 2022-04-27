FROM node:17-alpine3.14

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]