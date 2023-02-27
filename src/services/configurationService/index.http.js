/* eslint-disable no-undef */
import HttpClient from "services/httpClient";

export default class ConfigurationService extends HttpClient {
  constructor() {
    super();
    this.service = this.createService("configuration");
  }
}
