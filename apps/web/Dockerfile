FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .

RUN pnpm build --filter=web

FROM base AS runner
WORKDIR /app
RUN pnpm add -g http-server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 http-server
COPY --from=installer --chown=http-server:nodejs /app/apps/demo/dist .
USER http-server

ENV VITE_PORT=3000
EXPOSE ${VITE_PORT}

CMD [ "http-server", "./" ]
