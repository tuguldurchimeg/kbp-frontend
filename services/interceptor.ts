import api from "./api";
import { URI, excludeURI } from "@/constants/uri.constants";

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onAccessTokenFetched(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

function getUser() {
  const raw = localStorage.getItem("authUser");
  return raw ? JSON.parse(raw) : null;
}

function saveUser(user: any) {
  localStorage.setItem("authUser", JSON.stringify(user));
}

export function initInterceptors() {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const user = getUser();
      const token = user?.access_token;

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
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
          const user = getUser();
          const refresh_token = user?.refresh_token;

          try {
            const { access_token } = await api
              .post(URI.REFRESH, { refresh_token })
              .then((res) => res.data);

            const updatedUser = { ...user, access_token };
            saveUser(updatedUser);
            onAccessTokenFetched(access_token);
          } catch {
            localStorage.removeItem("authUser");
            window.location.href = "/login";
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      return Promise.reject(error);
    }
  );
}
