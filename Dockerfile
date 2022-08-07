FROM node:16-alpine AS build

WORKDIR /build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install

COPY . .

RUN --mount=type=secret,id=REACT_APP_API_URL \
  --mount=type=secret,id=REACT_APP_SENTRY_DSN \
  --mount=type=secret,id=REACT_APP_MAPBOX_TOKEN \
  export REACT_APP_API_URL=$(cat /run/secrets/REACT_APP_API_URL) && \
  export REACT_APP_SENTRY_DSN=$(cat /run/secrets/REACT_APP_SENTRY_DSN) && \
  export REACT_APP_MAPBOX_TOKEN=$(cat /run/secrets/REACT_APP_MAPBOX_TOKEN) && \
  echo $REACT_APP_API_URL

RUN yarn build

FROM nginx:1.18-alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/build /frontend/build