FROM node

WORKDIR /app

COPY backend/package*.json ./backend/

RUN cd backend && npm install

COPY . .

EXPOSE 8080

CMD cd backend && npm start