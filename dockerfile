FROM node:18-alphine
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["node", "serve.js"]