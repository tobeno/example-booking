import request from "request-promise-native";
import { Response } from "request";
import querystring from "querystring";
import { StatusCodeError } from "request-promise-native/errors";

export interface HerePlacesItem {
  id: string;
  title: string;
}

class HerePlacesClient {
  appId: string;
  appCode: string;
  baseUrl: string;

  constructor(baseUrl: string, appId: string, appCode: string) {
    this.appId = appId;
    this.appCode = appCode;
    this.baseUrl = baseUrl;
  }

  async browse(
    at: string,
    categories: Array<string>,
    size: number,
  ): Promise<Array<HerePlacesItem>> {
    const response = await this.get("/browse", {
      at,
      cat: categories.join(","),
      size: size.toString(),
    });

    const data = JSON.parse(response.toString());
    if (!data || !data.results || !data.results.items) {
      throw new Error("Unexpected result received from HERE Places API.");
    }

    return data.results.items;
  }

  async get(
    path: string,
    parameters: { [key: string]: string } = {},
  ): Promise<Response> {
    const url = `${this.baseUrl}${path}?${querystring.stringify({
      ...parameters,
      app_id: this.appId,
      app_code: this.appCode,
    })}`;

    let response;
    try {
      response = await request.get({
        url,
      });
    } catch (err) {
      if (err instanceof StatusCodeError) {
        const response = err.response;
        const body = JSON.parse(response.body);

        throw new Error(
          `Request failed with error response: ${
            body ? body.message : "unknown"
          }`,
        );
      }

      throw new Error(`Request failed with error: ${err.message}`);
    }

    return response;
  }
}

export default HerePlacesClient;
