# Keep hub.Dockerfile aligned to this file as far as possible

ARG base=hmctspublic.azurecr.io/base/node:12-alpine

# ---- Build artifacts ----
# Both frontend and backend codebases are bundled from their
# .ts source into .js, producing self-sufficient scripts.
FROM ${base} AS build
USER root
RUN apk update \
    && apk add \
    bzip2>1.0.6 \
    patch>2.7.5 \
    fontconfig>2.11.0 \
    bash \
    && rm -rf /var/lib/apt/lists/*
USER hmcts
COPY package.json yarn.lock .snyk bin ./
USER root
RUN chown hmcts yarn.lock
USER hmcts
RUN yarn install --ignore-optional
COPY . .
RUN yarn build:ssr

# ---- Runtime image ----
FROM ${base} AS runtime
COPY --from=build ${WORKDIR}/dist/ ./
CMD node ./server.js
