# Example: Simple Booking Application

This is a personal demo application developed as a code challenge.

## Challenge

Allow users to find properties (e.g. hotels) around them and submit booking requests for them.

Requirements:

- The search is location (geo positioning) based
- Any property can be selected and a booking request submitted
- All booking requests are available via a public REST API

  - By user
  - By property

Not defined in challenge:

- Load to be handled -> Assume prototype without load
- Persistence of data -> Assume basic persistence needed
- Which booking information needed? -> Assume only dummy data is collected (name of customer)
- What data of properties displayed? -> Assume only basic information (name and address) is displayed
- How many properties should be listed -> Assume max. 50 properties are displayed without pagination
- Should the service run on an actual server? -> Assume local prototype, no docker or CI setup
- Which languages should be supported? -> Assume no localization support needed for now

## Goals

Basic working prototype consisting of an API and a web client that can be used locally.
It is not intended for production use in any way.
The frontend is only rudimentary, main focus is the full user flow and a clean setup.

Quality:

- Testing: Critical parts covered with unit and integration tests, no end-to-end tests
- Code: Automatically formatted using best practices (enforced by eslint and prettier)
- Typing: Fully typed using TypeScript
- Architecture: Clean structure that would allow future extension, but with focus on simplicity

## Components

This project consists of two packages, the [API](api/README.md) and the [Web-App](web-app/README.md).
See their README.md files for further details on setup and usage.

## Usage

Follow the setup instructions in API and Web-App and start both servers using `npm run start`.

Verify that the API is working correctly by accessing http://localhost:8080/v1/properties?at=48.1366,11.5771.
If everything is setup correctly, this endpoint should return a list of properties near the given coordinates.

After access the web client using http://localhost:3000/ and feel free to look around.
There is no actual booking involved, so no worries about clicking any buttons.

## Development History

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
6. Web-App project setup
   - Create-React-App as basis
   - Jest for testing
   - Prettier and eslint for code quality
   - Material-UI for UI components
7. Add properties list in web
8. Milestone reached: Properties are being displayed in a static list
9. Update API specification
  - Error responses and resource creation
