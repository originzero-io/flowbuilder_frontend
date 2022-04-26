/* eslint-disable no-undef */
import axios from "axios";

export default class HTTPService {
    constructor() {
        this.service = axios;
    }
    createService(serviceName) {
        if (typeof serviceName !== 'undefined') {
            this.service = axios.create({
              baseURL: `${process.env.REACT_APP_BASE_URL}/${serviceName}`,
              timeout: 3000,
            });
            this.service.interceptors.request.use(function (config) {
              const token = localStorage.getItem("token");
              config.headers.Authorization = token ? `Bearer ${token}` : "";
              return config;
            });
            return this.service;
        }
        else throw new Error("Provide service name to create service");
    }
}