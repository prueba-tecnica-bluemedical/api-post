# -------- base --------
FROM node:22.12.0-alpine AS base
WORKDIR /app

# -------- deps + build --------
FROM base AS build
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build
RUN npm prune --omit=dev

# -------- runtime --------
FROM node:22.12.0-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# ejecuta como usuario no root
USER node

# solo lo necesario para correr
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]
