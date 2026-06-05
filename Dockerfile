FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /repo
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN pnpm fetch --prod=false
FROM base AS builder

ARG VITE_POSTHOG_PROJECT_TOKEN
ARG VITE_POSTHOG_API_HOST
ARG VITE_POSTHOG_UI_HOST
ARG VITE_TURNSTILE_SITE_KEY

ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY
ENV VITE_POSTHOG_PROJECT_TOKEN=$VITE_POSTHOG_PROJECT_TOKEN
ENV VITE_POSTHOG_API_HOST=$VITE_POSTHOG_API_HOST
ENV VITE_POSTHOG_UI_HOST=$VITE_POSTHOG_UI_HOST

COPY --from=deps /pnpm/store /pnpm/store
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=builder /repo/apps/web/.output ./.output
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
