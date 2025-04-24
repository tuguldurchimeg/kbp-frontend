import axios from "axios";
import { URI } from "@/constants/uri.constants";

const api = axios.create({
  baseURL: URI.API,
  headers: {
    "Content-Type": "application/json",
    "Time-Zone": Intl.DateTimeFormat().resolvedOptions()?.timeZone || "UTC",
  },
});

export default api;
