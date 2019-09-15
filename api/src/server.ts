import http from "http";
import https from "https";
import path from "path";
import fs from "fs";
import { createApp } from "./app";

const httpPort = process.env.APP_HTTP_PORT;
const httpsKey = process.env.APP_HTTPS_KEY;
const httpsCert = process.env.APP_HTTPS_CERT;
const httpsPort = process.env.APP_HTTPS_PORT;

const rootPath = path.resolve(__dirname, "..");

if (httpsPort && (!httpsKey || !httpsCert)) {
  throw new Error(
    "APP_HTTPS_KEY and APP_HTTPS_CERT are required if HTTPS is enabled.",
  );
}

if (!httpPort && !httpsPort) {
  throw new Error("Either APP_HTTP_PORT or APP_HTTPS_PORT is required.");
}

const app = createApp();

if (httpPort) {
  const httpServer = http.createServer(app);

  httpServer.listen(httpPort, (): void => {
    console.log(`HTTP server listening on port ${httpPort}`);
  });
}

if (httpsPort && httpsCert && httpsKey) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(path.resolve(rootPath, httpsKey), "utf8"),
      cert: fs.readFileSync(path.resolve(rootPath, httpsCert), "utf8"),
    },
    app,
  );

  httpsServer.listen(httpsPort, (): void => {
    console.log(`HTTPS server listening on port ${httpsPort}`);
  });
}
