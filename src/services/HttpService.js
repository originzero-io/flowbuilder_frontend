/* eslint-disable no-undef */
import axios from "axios";
import notification from "utils/notificationHelper";

console.log("envvvv: ", process.env.REACT_APP_HOST_ENV);
export default class HTTPService {
    constructor() {
        this.service = axios;
    }
    createService(serviceName) {
        if (typeof serviceName !== 'undefined') {
            this.service = axios.create({
              baseURL: `${
                process.env.REACT_APP_HOST_ENV === 'development'
                  ? process.env.REACT_APP_BASE_LOCAL_URL
                  : process.env.REACT_APP_BASE_CLOUD_URL
              }/${serviceName}`,
              timeout: 3000,
            });
            this.service.interceptors.request.use(function (config) {
              const token = localStorage.getItem("token");
              config.headers.Authorization = token ? `Bearer ${token}` : "";
              return config;
            })
            this.service.interceptors.response.use(function (response) {
              // Any status code that lie within the range of 2xx cause this function to trigger
              // Do something with response data
              return response;
            }, function (error) {
              // Any status codes that falls outside the range of 2xx cause this function to trigger
              // Do something with response error
              notification.error(error.response.data.message);
              return Promise.reject(error);
            });
            return this.service;
        }
        else throw new Error("Provide service name to create service");
    }
}