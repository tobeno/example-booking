# Example: Simple booking application

This is a demo application developed as a code challenge.

## Goal

Allow users to find properties (e.g. hotels) around them and submit booking requests for them.

Requirements:
- The search is location (geo positioning) based
- Any property can be selected and a booking request submitted
- All booking requests are available via a public REST API
  - By user
  - By property

## Components

This project consists of two packages, the [API](api/README.md) and the [Web-App](web-app/README.md). 
See their README.md files for further details on setup and usage.

## Development history

1. Verify requirements
2. Getting familiar with [HERE Places API](https://developer.here.com/documentation/places)
  - Tested it using Postman and looked deeper into the browse features that seems like a good fit
  - Example call: /browse?at=48.1366,11.5771&cat=hotel&app_id={{appId}}&app_code={{appCode}}
3. API project setup
  - Typescript and Babel for typing and coding features
  - Prettier and eslint for code quality
  - Jest for testing
  - OpenAPI v3 for documentation
  - Express as server
4. Initial API specification
5. Add /v1/properties endpoint and HERE Places client
