# Web-App

This is a simple dummy booking portal.

## Requirements

- NodeJS >= 10 (including NPM)
- Recent browser version

## Installation

- Install dependencies using `npm install`
- Copy the _.env.dist_ file to _.env_ to define the variables required by the dev server

## CLI

All commands available via CLI are provided using `npm run [command]`.

Available commands:

- start: Start a server for development (used .env file as configuration)
- build: Build this project
- type-check: Run typescript to check for typing issues
- lint: Run linter against project files to check for code issues
- prettier: Reformat all project files using prettier
- test: Run all available tests
- ssl:regenerate: Update the SSL certificate used locally

## Development

To start development use the dev server by running `npm run start`.
By default this server will run under port 3000 (HTTP).

### Components

All components use the functional programming pattern of react and make use of hooks where state or context is needed.

Pages are used in the router as route component.

The components are structured in a flat hierarchy.
Page specific components are put in a folder directly below the components root named after the page (e.g. _home_ for _HomePage_).

### CSS

This project uses CSS variables to share common values (like colors).
All global variables are defined in the _src/variables.css_ file.

CSS of components uses the [BEM conventions](http://getbem.com/naming/).
The component wrapper element receives the name of the component as className and acts as BEM block.
