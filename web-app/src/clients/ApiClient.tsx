import qs from "qs";
import { ApiProperty, ApiInputUser, ApiBookingWithUser } from "../types";

class ApiClient {
  baseUrl: string;

  static async getResponseData(response: Response, path: string): Promise<any> {
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

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getProperties(at: string): Promise<Array<ApiProperty>> {
    return this.get("/properties", { at });
  }

  async addBooking(
    property: ApiProperty,
    user: ApiInputUser,
  ): Promise<ApiBookingWithUser> {
    return this.post("/bookings", {
      property_id: property.id,
      property_name: property.name,
      property_location: property.location,
      user,
    });
  }

  async get(
    path: string,
    parameters: { [key: string]: string } = {},
  ): Promise<any> {
    const query = qs.stringify(parameters);
    const response = await fetch(
      `${this.baseUrl}${path}${query ? `?${query}` : ""}`,
    );

    return ApiClient.getResponseData(response, path);
  }

  async post(path: string, body: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return ApiClient.getResponseData(response, path);
  }
}

export default ApiClient;
