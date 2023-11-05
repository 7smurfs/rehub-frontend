FROM node:18

WORKDIR /app

COPY . .

RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]