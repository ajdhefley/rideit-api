# Populate container with coasters
npm run tools:scraper -- --db-host=$DB_HOST --db-user=$DB_USER --db-password=$DB_PASSWORD --db-name=coasterranker --chrome-path=/usr/bin/google-chrome --pages=1,2 --reset

# Generate Base64 encodings for images
npm run tools:encoder -- --db-host=$DB_HOST --db-user=$DB_USER --db-password=$DB_PASSWORD --db-name=coasterranker

# Create mock review/comment data
npm run tools:mock -- --db-host=$DB_HOST --db-user=$DB_USER --db-password=$DB_PASSWORD --db-name=coasterranker --reviews=12 --comments=4

# Start the API
node dist/main.js