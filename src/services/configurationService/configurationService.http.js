/* eslint-disable no-undef */
import HttpClient from "services/HttpClient";

export default class ConfigurationService extends HttpClient {
  constructor() {
    super();
    this.service = this.createService("configuration");
  }
}