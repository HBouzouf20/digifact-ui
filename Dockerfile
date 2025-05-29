# Step 1: Build the Angular application
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./ ./

# Define build-time arguments for environment variables
ARG ENVIRONMENT=production
ARG HOST_NAME=localhost
ARG PUBLIC_ASSETS_URL=https://api.digirepair.bouzouf.com/api/storage/public/
ARG SERVER_URL=https://api.digirepair.bouzouf.com
ARG HOST_URL=https://api.digirepair.bouzouf.com/api/
ARG AUTH_URL=https://api.digirepair.bouzouf.com/api/auth/

# Set environment variables
ENV ENVIRONMENT=${ENVIRONMENT}
ENV HOST_NAME=${HOST_NAME}
ENV PUBLIC_ASSETS_URL=${PUBLIC_ASSETS_URL}
ENV SERVER_URL=${SERVER_URL}
ENV HOST_URL=${HOST_URL}
ENV AUTH_URL=${AUTH_URL}

# Install gettext-base for envsubst
RUN apt-get update && apt-get install -y gettext-base

# Replace environment variables in Angular environment files
RUN envsubst < src/environment/templates/environment.prod.ts.template > src/environment/environment.prod.ts

# Build the Angular app for the specified environment
RUN npm run build -- --configuration $ENVIRONMENT

# Step 2: Configure NGINX and serve the app
FROM nginx:alpine

# Define the distribution directory
ARG DIST_DIR=/app/dist/repair
ENV DIST_DIR=${DIST_DIR}

# Copy the built Angular app to the NGINX server directory
COPY --from=build ${DIST_DIR} /usr/share/nginx/html

# Copy custom NGINX configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 90
EXPOSE 90

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
