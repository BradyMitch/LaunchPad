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

# Set the working directory to /app
WORKDIR /app

# Copy the frontend build artifacts into the container
COPY frontend/ .

# ================================= #
# 🐳🐳       DEV BUILD       🐳🐳 #
# ================================= #
FROM base as dev
ENV NODE_ENV=development

# Npm install packages.
RUN npm i

# Expose port for dev server.
EXPOSE 9000

# Start the development server.
CMD ["npm", "run", "dev"]

# ================================= #
# 🐳🐳   [1/2] PROD BUILD    🐳🐳 #
# ================================= #
FROM base as prod-base
ENV NODE_ENV=production

# Npm install packages. Omits dev dependencies when NODE_ENV=production
RUN npm i

# Build the project.
RUN npm run build

# ================================= #
# 🐳🐳   [2/2] PROD NGINX    🐳🐳 #
# ================================= #

# Source: https://hub.docker.com/layers/library/nginx/alpine-slim/images/sha256-0f859db466fda2c52f62b48d0602fb26867d98edbd62c26ae21414b3dea8d8f4?context=explore
FROM nginx:alpine-slim as prod

# Copy nginx configuration.
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory.
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets.
RUN rm -rf ./*

# Copy static assets from build stage.
COPY --from=prod-base /app/build .

# Provide nginx directory the required permissions.
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

# Run nginx with global directives and daemon off.
ENTRYPOINT ["nginx", "-g", "daemon off;"]
