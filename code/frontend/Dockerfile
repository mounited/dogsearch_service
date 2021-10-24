FROM node

WORKDIR /app

COPY package.json ./

RUN yarn install --network-timeout 1000000

ENV PORT=80

CMD ["yarn", "start"]
