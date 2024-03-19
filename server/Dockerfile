FROM node:lts-alpine AS builder

WORKDIR /app

COPY . .
RUN yarn
RUN yarn tsc

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY ./prisma ./prisma
RUN yarn install --production
RUN yarn prisma generate

CMD [ "yarn", "start" ]