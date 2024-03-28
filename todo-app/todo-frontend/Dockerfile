FROM node:18 AS testing-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm run test

FROM node:18

COPY --from=testing-stage /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "-p", "3001", "build"]
