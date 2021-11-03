FROM node:slim as packager

WORKDIR /opt/application

COPY application/package.json .
COPY application/yarn.json .
COPY application/tsconfig.json .
COPY application/tsconfig.build.json .

RUN yarn install

FROM node:slim AS builder

WORKDIR /opt/application

COPY --from=packager /opt/application/node_modules .
COPY application/src .

RUN yarn build

FROM node:slim AS runner

WORKDIR /opt/application

COPY --from=builder /opt/application/dir .
COPY --from=builder /opt/application/node_modules .

RUN node dist/main