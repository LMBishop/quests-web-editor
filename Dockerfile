FROM node:20-slim as base

ENV NODE_ENV=production

WORKDIR /src


FROM base as build

COPY package.json package-lock.json ./
RUN npm install 

COPY . ./

RUN npm run build
RUN npm prune


FROM base

ENV PORT=3000

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]