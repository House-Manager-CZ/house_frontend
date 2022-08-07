FROM node:16-alpine AS build

WORKDIR /build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

ARG REACT_APP_API_URL
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_MAPBOX_TOKEN

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.18-alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/build /frontend/build