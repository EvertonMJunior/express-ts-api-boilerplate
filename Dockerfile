FROM ubuntu:20.04 AS system-setup

# Env
ENV TZ=UTC

# Set the timezone in docker
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

################################################################################

FROM node:lts-alpine AS packages-installation
# Create Directory for the Container
WORKDIR /usr/src/organization/api
# Only copy the package.json and tsconfig.json file to work directory
COPY package.json .
COPY tsconfig.json .
RUN yarn install --silent --non-interactive && yarn cache clean

################################################################################

FROM node:lts-alpine AS api-build
WORKDIR /usr/src/organization/api
# Copy the package.json, tsconfig.json, node_modules and build files to work directory
COPY --from=packages-installation /usr/src/organization/api/package.json .
COPY --from=packages-installation /usr/src/organization/api/tsconfig.json .
COPY --from=packages-installation /usr/src/organization/api/node_modules node_modules
COPY ./src src
RUN yarn build && rm -rf src

################################################################################

FROM node:lts-alpine AS api-production-stage

WORKDIR /organization/api

ENV ENV_NAME production
ENV NODE_ENV production
ENV NODE_CONFIG_ENV production

COPY --from=packages-installation /usr/src/organization/api/package.json .
COPY --from=packages-installation /usr/src/organization/api/tsconfig.json .
COPY --from=packages-installation /usr/src/organization/api/node_modules ./node_modules
COPY --from=api-build /usr/src/organization/api/build ./build

# Start
CMD [ "node", "build/server.js" ]
EXPOSE 80
