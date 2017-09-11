# Ninkasi

This is the private admin GUI for managing the data pipeline and inspection of data status

## Run the app 

### Dev

```

npm install
npm run dev
```

### Production
```

npm install
npm run build
npm start
```

## Testing

Uses Nightwatch with Selenium for automated testing, cf. [documentation](http://nightwatchjs.org/)

Running the tests locally can be achived by (note: this required a running selenium-hub)
```
  nightwatch --env local

```

## Configuration

We use convict.js for config. Set environment variables `PROVIDERS_BASE_URL`, `ORGANISATIONS_BASE_URL`, `MARDUK_BASE_URL`
and `NABU_BASE_URL` in order to override default configuration of these
endpoints. E.g.

```
  ORGANISATIONS_BASE_URL=http://localhost:16001/services/organisations/ PROVIDERS_BASE_URL=http://localhost:16001/services/providers/ NABU_BASE_URL=http://localhost:10001/ MARDUK_BASE_URL=http://localhost:11002/ npm start dev
```

Optional environment variable `ENDPOINTBASE` overrides namespace for client including slash. E.g.

```
  ENDPOINTBASE=/admin/ninkasi/ ORGANISATIONS_BASE_URL=http://localhost:16001/services/organisations/ PROVIDERS_BASE_URL=http://localhost:16001/services/providers/ NABU_BASE_URL=http://localhost:10001/ MARDUK_BASE_URL=http://localhost:11002/ npm start dev
```


### Authentication

Uses Keycloak to authenticate user and read JWT, set `auth-server-url`:

```
AUTH_SERVER_URL=https://test.rutebanken.org/auth port=9000 ENDPOINTBASE=/admin/ninkasi/ NABU_BASE_URL=http://localhost:10001/ MARDUK_BASE_URL=http://localhost:11002/ npm start dev

```

***NB*** Use `PORT=8000` or `PORT=9000` for development against `https://test.rutebanken.org/auth` since these are whitelisted.

