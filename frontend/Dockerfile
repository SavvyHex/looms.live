# Frontend Dockerfile - multi-stage build for Next.js
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time arguments for NEXT_PUBLIC_* and GEMINI_API_KEY
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG GEMINI_API_KEY

# Set environment variables from args so they're available during build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy app source and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app and production dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
