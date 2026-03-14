FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm ci

# Copy source
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3001

CMD ["npm", "start"]
