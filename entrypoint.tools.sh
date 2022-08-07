npm run tools:scraper -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker --reset
npm run tools:encoder -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker
npm run tools:mock -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker --reviews=4 --comments=2 --reset
npm run tools:rank -- --db-host=host.docker.internal --db-user=postgres --db-password=postgres --db-name=coasterranker