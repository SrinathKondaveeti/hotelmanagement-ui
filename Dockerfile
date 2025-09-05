# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Angular app in production mode
RUN ng build --configuration production

# Stage 2: Serve using Node.js
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built Angular files
COPY --from=build /app/dist/hotel-management ./dist/hotel-management

# Copy server.js
COPY server.js .

EXPOSE 4000
CMD ["node", "server.js"]
