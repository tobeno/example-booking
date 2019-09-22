import request from "request-promise-native";
import { Response } from "request";
import querystring from "querystring";
import { StatusCodeError } from "request-promise-native/errors";

export interface HerePlacesItem {
  /** Unique identifier */
  id: string;
  /** Title of the item */
  title: string;
  /** Distance from given location in meters */
  distance?: number;
  /** Description of location as free text (e.g. the address) */
  vicinity?: string;
  /** URL to details endpoint */
  href: string;
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      app_id: this.appId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      app_code: this.appCode,
      tf: "plain", // Use plain text in rich values like vicinity
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
