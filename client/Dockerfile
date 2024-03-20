# Start from a base image of Node 16
FROM node:18-alpine

# Set working directory for containerized application
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the dev script
RUN npm run dev

# Expose our server port in the container
EXPOSE 3000