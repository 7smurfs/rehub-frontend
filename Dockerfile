FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

COPY . /app

EXPOSE 3000
CMD ["server", "-s", "build"]