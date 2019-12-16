import HerePlacesClient from "./clients/HerePlacesClient";
import { createModel, Model } from "./model";
import ApiMapper from "./mappers/ApiMapper";
import { createConnection } from "./model/connection";
import DummyHerePlacesClient from "./clients/DummyHerePlacesClient";

export interface Services {
  herePlacesClient: HerePlacesClient;
  apiMapper: ApiMapper;
  model: Model;
}

export interface Env {
  APP_HERE_PLACES_DUMMY?: string;
  APP_HERE_PLACES_URL?: string;
  APP_HERE_PLACES_APP_ID?: string;
  APP_HERE_PLACES_APP_CODE?: string;
  APP_MONGO_URL?: string;
  APP_MONGO_DB_NAME?: string;
  APP_MONGO_USERNAME?: string;
  APP_MONGO_PASSWORD?: string;
}

export function createServices(env: Env): Services {
  let herePlacesClient;

  const herePlacesDummy = env.APP_HERE_PLACES_DUMMY === "1";
  if (!herePlacesDummy) {
    const herePlacesUrl = env.APP_HERE_PLACES_URL;
    const herePlacesAppId = env.APP_HERE_PLACES_APP_ID;
    const herePlacesAppCode = env.APP_HERE_PLACES_APP_CODE;
    if (!herePlacesUrl || !herePlacesAppId || !herePlacesAppCode) {
      throw new Error(
        "APP_HERE_PLACES_URL, APP_HERE_PLACES_APP_ID or APP_HERE_PLACES_APP_CODE is not defined.",
      );
    }

    herePlacesClient = new HerePlacesClient(
      herePlacesUrl,
      herePlacesAppId,
      herePlacesAppCode,
    );
  } else {
    herePlacesClient = new DummyHerePlacesClient();
  }

  const mongoUrl = env.APP_MONGO_URL;
  const mongoDbName = env.APP_MONGO_DB_NAME;
  const mongoUsername = env.APP_MONGO_USERNAME;
  const mongoPassword = env.APP_MONGO_PASSWORD;
  if (!mongoUrl || !mongoDbName) {
    throw new Error("APP_MONGO_URL or APP_MONGO_DB_NAME is not defined.");
  }

  const model = createModel(
    createConnection(mongoUrl, mongoDbName, mongoUsername, mongoPassword),
  );

  const apiMapper = new ApiMapper(model);

  return {
    herePlacesClient,
    model,
    apiMapper,
  };
}
