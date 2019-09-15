# API

This API is REST based and represents a simple booking service.

It's documentation is available as OpenAPI v3 specification under _api/public/schema.yaml_ (_/schema.yaml_ on the server).
To view the documentation you can use [Swagger Editor](https://editor.swagger.io/).

## Requirements

- NodeJS >= 10 (including NPM)

## Installation

- Install dependencies using `npm install`
- Copy the _.env.dist_ file to _.env_ to define the variables required by the dev server

## CLI

All commands available via CLI are provided using `npm run [command]`.

Available commands:

- start: Start a server for development (used .env file as configuration)
- build: Build this project
- serve: Start a production server (requires build)
- type-check: Run typescript to check for typing issues
- lint: Run linter against project files to check for code issues
- prettier: Reformat all project files using prettier
- test: Run all available tests

## Development

To start development use the dev server by running `npm run start`.
By default this server will run under port 8080 (HTTP) and 8443 (HTTPS).
The HTTPS server uses a self signed certificate located under _api/etc/ssl_.

To debug the server, start the server in debug mode using `npm run start -- --inspect`
and connect using the Google Chrome Node DevTools available under chrome://inspect.
