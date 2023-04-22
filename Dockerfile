FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3333
CMD [ "yarn", "start:deploy" ]