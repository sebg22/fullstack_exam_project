# Use Node.js official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=production

# Compile TypeScript if using TS
RUN npm run build

# Expose the server port (adjust as needed)
EXPOSE 3000

# Start the application (adjust if using a different script)
CMD ["node", "dist/index.js"]
