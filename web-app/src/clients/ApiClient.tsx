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
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(
        `Request to path ${path} failed with status code ${response.status}. ${
          data.message ? data.message : ""
        }`,
      );
    }

    return data;
  }
}

export default ApiClient;
