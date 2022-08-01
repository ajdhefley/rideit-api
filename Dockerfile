# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies and tools
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates production build
RUN npm run build

# Start the server using the production build
CMD ["node", "dist/main.js"]