# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY server.js ./
COPY controller.html ./
COPY controller2.html ./
COPY controller3.html ./
COPY liara.json ./
COPY FullScreenMario-master ./FullScreenMario-master
COPY games ./games

# Set environment variable for production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]


