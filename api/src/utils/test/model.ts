import { Connection } from "mongoose";
import { createConnection } from "../../model/connection";

export function createTestConnection(): Connection {
  const mongoUrl = global.__MONGO_URI__;
  const mongoDbName = global.__MONGO_DB_NAME__;
  if (!mongoUrl || !mongoDbName) {
    throw new Error(
      "Global __MONGO_URI__ or __MONGO_DB_NAME__ not defined correctly.",
    );
  }

  return createConnection(mongoUrl, mongoDbName);
}
