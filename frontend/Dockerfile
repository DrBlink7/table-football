FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY tsconfig.eslint.json .
COPY craco.config.ts .
COPY .eslintrc.json .

RUN yarn install --network-timeout 1000000000

# Development image
FROM builder AS development

EXPOSE $PORT
CMD ["yarn", "start"]

# Production builder
FROM builder AS production-builder

ENV NODE_ENV production

COPY . .

RUN yarn build

# Production image
FROM nginx:stable-alpine-slim AS production

EXPOSE 8000

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

# Copy over the custom default configs.
COPY nginx/configs/default.conf /etc/nginx/conf.d/default.conf

COPY nginx/configs/htpasswd /etc/nginx/conf.d/htpasswd

# Copy frontend files
COPY --from=production-builder /frontend/build /srv/www

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]