npm run tools:scraper -- --api-host=http://host.docker.internal:5000/api --reset
npm run tools:encoder -- --api-host=http://host.docker.internal:5000/api
npm run tools:mock -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker --reviews=4 --comments=2 --reset
npm run tools:rank -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker