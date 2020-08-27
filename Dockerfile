# SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

FROM node:12

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

# The GRAPHQL_* variables are built in the image for production.
# For development, these variables can be overridden by environment variables.
# Remember: Run `yarn start` for production and `yarn dev` for development.
ARG GRAPHQL_HTTP_ENDPOINT
ARG GRAPHQL_BROWSER_HTTP_ENDPOINT
ARG GRAPHQL_WS_HTTP_ENDPOINT

COPY . .
RUN yarn build

ENV HOST=0.0.0.0
EXPOSE 3000
CMD [ "yarn", "start" ]
