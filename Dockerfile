# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci --omit=dev

# Copy app source
COPY . .

# Expose ports
EXPOSE 3001 4000

# Start both backend and gateway using concurrently
CMD ["npm", "run", "docker-start"]
