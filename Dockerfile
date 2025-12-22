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
COPY controller4.html ./
COPY controller5.html ./
COPY controller6.html ./
COPY controller10.html ./
COPY controller11.html ./
COPY smashkarts.html ./
COPY Streets_of_Rage_2.html ./
COPY liara.json ./
COPY MULTIPLAYER_SESSIONS.md ./
COPY FullScreenMario-master ./FullScreenMario-master
COPY games ./games

# Set environment variable for production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]


