/* eslint-disable no-undef */
import axios from "axios";
import store from "index";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";
import notification from "utils/ui/notificationHelper";

export default class HttpClient {
  constructor() {
    this.service = axios;
  }

  static setAuthorizationToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else delete axios.defaults.headers.common.Authorization;
  }

  createService(serviceName) {
    if (typeof serviceName !== "undefined") {
      this.service = axios.create({
        baseURL: `${
          import.meta.env.VITE_HOST_ENV === "development"
            ? import.meta.env.VITE_GATEWAY_LOCAL_URL
            : import.meta.env.VITE_GATEWAY_CLOUD_URL
        }/${serviceName}`,
      });
      this.service.interceptors.request.use((config) => {
        store.dispatch(beginTheBar());
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });
      this.service.interceptors.response.use(
        (response) => {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          store.dispatch(endTheBar());
          return response;
        },
        (error) => {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          notification.error(
            error.response.data.message || error.response.data
          );
          console.log("Http-client-error: ", error);
          store.dispatch(endTheBar());
          return Promise.reject(error);
        }
      );
      return this.service;
    }
    throw new Error("Provide service name to create service");
  }
}
