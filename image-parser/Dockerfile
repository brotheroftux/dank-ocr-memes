FROM node

WORKDIR /service/data-provider

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 7335

CMD npm start