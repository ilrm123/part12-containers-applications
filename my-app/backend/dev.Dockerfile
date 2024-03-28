FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm", "run", "dev"]
