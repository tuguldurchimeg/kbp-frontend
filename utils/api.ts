import axios from "axios";
import { URI, excludeURI } from "@/constants/uri.constants";
import { CurrentUser } from "@/types/user";

const api = axios.create({
  baseURL: URI.API,
  headers: {
    "Content-Type": "application/json",
    "Time-Zone": Intl.DateTimeFormat().resolvedOptions()?.timeZone || "UTC",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = getUser();
    const token = user?.access_token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No token found in localStorage.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;
    const url = originalRequest?.url?.replace(api.defaults.baseURL || "", "");

    if (status === 401 && url && !excludeURI.includes(url)) {
      if (!isRefreshing) {
        isRefreshing = true;
        const user = getUser(); // Get user only if on client-side
        const refresh_token = user?.refresh_token;

        if (!refresh_token) {
          console.error("No refresh token found, logging out.");
          if (typeof window !== "undefined") {
            localStorage.removeItem("authUser");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        try {
          const { access_token } = await api
            .post(URI.REFRESH, { refresh_token })
            .then((res) => res.data);

          const updatedUser = { ...user, access_token };
          saveUser(updatedUser);
          onAccessTokenFetched(access_token);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          if (typeof window !== "undefined") {
            localStorage.removeItem("authUser");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        addSubscriber((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

// Handle token fetched and notify subscribers
function onAccessTokenFetched(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

// Add new subscriber for handling token refresh
function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

function getUser() {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  }
  return null; // return null if on server-side
}

function saveUser(user: CurrentUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authUser", JSON.stringify(user));
  }
}

export default api;
