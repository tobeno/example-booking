import HerePlacesClient from "./clients/HerePlacesClient";

let herePlacesUrl = process.env.APP_HERE_PLACES_URL;
let herePlacesAppId = process.env.APP_HERE_PLACES_APP_ID;
let herePlacesAppCode = process.env.APP_HERE_PLACES_APP_CODE;
if (!herePlacesUrl || !herePlacesAppId || !herePlacesAppCode) {
  throw new Error(
    "APP_HERE_PLACES_URL, APP_HERE_PLACES_APP_ID or APP_HERE_PLACES_APP_CODE is not defined.",
  );
}

export const herePlacesClient = new HerePlacesClient(
  herePlacesUrl,
  herePlacesAppId,
  herePlacesAppCode,
);
