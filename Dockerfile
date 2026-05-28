FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /repo
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN pnpm fetch --prod=false
FROM base AS builder
COPY --from=deps /pnpm/store /pnpm/store
COPY . .
RUN pnpm install
ARG APP_FILTER=@jenn.fyi/web
RUN pnpm --filter "${APP_FILTER}..." build
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=builder /repo/apps/web/.output ./.output
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
