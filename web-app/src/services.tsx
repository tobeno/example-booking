import ApiClient from "./clients/ApiClient";

const apiUrl = process.env.REACT_APP_API_URL;
if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is not defined.");
}

export const apiClient = new ApiClient(apiUrl);
