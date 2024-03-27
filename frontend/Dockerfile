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

# Copy frontend files 
COPY --from=production-builder /frontend/build /usr/share/nginx/html/
# COPY --from=production-builder /frontend/build/* /usr/share/nginx/html/ in case it doesn't unpack the directory

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]