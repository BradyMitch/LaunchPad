# ================================= #
# 🐳🐳         BASE          🐳🐳 #
# ================================= #

# Source: https://hub.docker.com/layers/library/node/18.14.2-bullseye-slim/images/sha256-ff7e511abfa57825e17a0655896cf9a644450179f6fa3159ec9813e4c2b87625?context=explore
# Advantages of using bullseye-slim for Node.js in Docker:
# - Smaller image size & less disk space usage.
# - Reduced attack surface & improved security.
# - Faster build times with fewer dependencies.
# - Better resource utilization & improved performance.
FROM node:18.14.2-bullseye-slim as base

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
# 🐳🐳       PROD BUILD      🐳🐳 #
# ================================= #
FROM base as prod
ENV NODE_ENV=production

# Npm install packages. Omits dev dependencies when NODE_ENV=production
RUN npm i

# Node Entrypoint.
CMD ["node","index.js"]