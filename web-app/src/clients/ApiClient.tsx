import qs from "qs";

export interface ApiClientProperty {
  id: string;
  name: string;
}

class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProperties(at: string): Promise<Array<ApiClientProperty>> {
    return this.get("/properties", { at });
  }

  async get(
    path: string,
    parameters: { [key: string]: string } = {},
  ): Promise<any> {
    const query = qs.stringify(parameters);
    const response = await fetch(
      `${this.baseUrl}${path}${query ? `?${query}` : ""}`,
    );
    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `Request to path ${path} failed with status code ${response.status}. ${
          responseBody.message ? responseBody.message : ""
        }`,
      );
    }

    if (!responseBody.data) {
      throw new Error(`Request to path ${path} returned invalid response.`);
    }

    return responseBody.data;
  }
}

export default ApiClient;
