import mongoose, { Connection } from "mongoose";

export function createConnection(
  mongoUrl: string,
  mongoDbName: string,
  mongoUsername?: string,
  mongoPassword?: string,
): Connection {
  const db = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: mongoUsername,
    pass: mongoPassword,
    dbName: mongoDbName,
  });

  db.on("error", (err: Error): void => {
    console.error(`Connection to MongoDB failed. ${err.toString()}`);
  });

  return db;
}
