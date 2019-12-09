FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
# RUN cd client/ && npm install


# EXPOSE 465
# EXPOSE 3000

# CMD [ "node", "index.js" ]