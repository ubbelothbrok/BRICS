# Build stage
FROM node:20-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build args can be used to override env vars during build if needed
# But Vite will pick up the .env file in the current directory
RUN npm run build

# Serve stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
