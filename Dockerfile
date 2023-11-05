FROM node:18-alpine AS development
ENV NODE_ENV development

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]