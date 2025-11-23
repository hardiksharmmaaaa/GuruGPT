# Stage 1: Build the React application
FROM node:18-alpine as builder

# Define build arguments
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_API_BASE_URL

# Set environment variables from build arguments
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY frontend/. ./

# Build the application
# The build script will use the environment variables
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.21.6-alpine

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]