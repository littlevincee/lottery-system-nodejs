# stage 1 - build the app
FROM node:16.17-alpine3.15 AS BUILDER

# Create and go into app dir
WORKDIR /usr/src/app

ENV NODE_ENV=build

RUN chown -R node:node /usr/src/app

USER node:node

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

RUN npm prune --production

# stage 2 - copy the production ready files to production
# to minimise the docker file size
FROM node:16.17-alpine3.15 AS PROD

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node:node

COPY  --chown=node:node --from=BUILDER /usr/src/app/package.json ./package.json
COPY  --chown=node:node --from=BUILDER /usr/src/app/package-lock.json ./package-lock.json
COPY  --chown=node:node --from=BUILDER /usr/src/app/node_modules/ ./node_modules/
COPY  --chown=node:node --from=BUILDER /usr/src/app/dist/ ./dist/

CMD ["node", "dist/main"]