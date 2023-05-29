# ================================= #
# 🐳🐳         BASE          🐳🐳 #
# ================================= #

# Source: https://hub.docker.com/layers/library/node/18.16-bullseye-slim/images/sha256-8463e2d7bacf0cb576453a0ea8425f3b3c87fa9dd5c8a84ab1908cfd407f3edd?context=explore
# Advantages of using bullseye-slim for Node.js in Docker:
# - Smaller image size & less disk space usage.
# - Reduced attack surface & improved security.
# - Faster build times with fewer dependencies.
# - Better resource utilization & improved performance.
FROM node:18.16-bullseye-slim as base

WORKDIR /app

# Copy files - ignores files from .dockerignore file.
COPY backend/. .

# ================================= #
# 🐳🐳       DEV BUILD       🐳🐳 #
# ================================= #
FROM base as dev
ENV NODE_ENV=development

# Npm install packages.
RUN npm i

# Nodemon Entrypoint.
CMD ["npm", "run", "dev"]

# ================================= #
# 🐳🐳   [1/2] PROD BUILD    🐳🐳 #
# ================================= #
FROM base as prod-build

# Npm install typescript for build command.
RUN npm i typescript@4.9.5

# Convert typescript code to JavaScript.
RUN npm run build

# ================================= #
# 🐳🐳       [2/2] PROD      🐳🐳 #
# ================================= #
FROM node:18.14.2-bullseye-slim as prod
ENV NODE_ENV=production

WORKDIR /app

# Npm install packages. Omits dev dependencies when NODE_ENV=production
COPY --from=prod-build /app/package.json ./package.json
RUN npm i

# Copy build files.
COPY --from=prod-build /app/build .

# Node Entrypoint.
CMD ["node","index.js"]
