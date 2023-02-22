/* eslint-disable no-undef */
import axios from "axios";
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
          process.env.REACT_APP_HOST_ENV === "development"
            ? process.env.REACT_APP_GATEWAY_LOCAL_URL
            : process.env.REACT_APP_GATEWAY_CLOUD_URL
        }/${serviceName}`,
        timeout: 3000,
      });
      this.service.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });
      this.service.interceptors.response.use(
        (response) =>
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          response,
        (error) => {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          notification.error(error.response.data.message);
          return Promise.reject(error);
        },
      );
      return this.service;
    }
    throw new Error("Provide service name to create service");
  }
}
