FROM node:16-alpine as builder

WORKDIR /app

COPY manifests ./
COPY packs/apps/             ./apps/

RUN yarn install --immutable
RUN yarn workspace doop2 build:dev

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/apps/doop2/package.json ./apps/doop2/package.json
COPY --from=builder /app/apps/doop2/.next ./apps/doop2/.next
COPY --from=builder /app/apps/doop2/public ./apps/doop2/public

ENV NODE_ENV="production"

ENV PORT="3000"
EXPOSE 3000

CMD ["yarn", "workspace", "doop2", "start"]