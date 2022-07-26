# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Installs dependencies needed for Puppeteer (tool to scrape coaster data)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Copy dependencies and tools
COPY ./package*.json ./
COPY ./tools/coaster-scraper ./tools/coaster-scraper
COPY ./tools/image-encoder ./tools/image-encoder
COPY ./tools/mock-data-creator ./tools/mock-data-creator

# Install dependencies
RUN npm install
RUN npm install --prefix tools/coaster-scraper
RUN npm install --prefix tools/image-encoder
RUN npm install --prefix tools/mock-data-creator

# Bundle app source
COPY . .

# Creates production build
RUN npm run build

# Entrypoint will run tools to sync data and then start the app
COPY ./entrypoint.sh .

# Start the server using the production build
CMD ["/bin/sh", "entrypoint.sh"]