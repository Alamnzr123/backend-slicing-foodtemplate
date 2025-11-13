# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies (use npm install to be more tolerant in CI/build environments)
RUN npm install --production --no-audit --no-fund

# Copy app source
COPY . .

# Expose ports
EXPOSE 3001 4000

# Start both backend and gateway using concurrently
CMD ["npm", "run", "docker-start"]
