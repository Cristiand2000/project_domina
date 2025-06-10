FROM node:18

WORKDIR /api/auth-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
