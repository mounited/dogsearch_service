FROM node

WORKDIR /app

COPY package.json ./

RUN yarn install

ENV PORT=80

CMD ["yarn", "start"]
