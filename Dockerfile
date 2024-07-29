# Use the official Node.js 14 image.
FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Copy the environment variable file
COPY .env ./

# Install TensorFlow.js dependencies.
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Install application dependencies.
RUN npm install @tensorflow/tfjs-node nsfwjs @nestjs/platform-express

# Expose the port the app runs on.
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "start:prod"]
