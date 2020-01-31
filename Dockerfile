FROM node:10.17
WORKDIR /app
COPY . .
RUN npm i && npm run coverage
ENTRYPOINT ["npm", "run"]
CMD ["auth"]


