FROM node:24.2.0 AS runner
WORKDIR /app
COPY ./ ./
RUN npm install

WORKDIR /app