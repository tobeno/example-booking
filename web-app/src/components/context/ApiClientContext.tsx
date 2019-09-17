import { createContext } from "react";
import ApiClient from "../../clients/ApiClient";

const ApiClientContext = createContext<ApiClient | null>(null);

export default ApiClientContext;
