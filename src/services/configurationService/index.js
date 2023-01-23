/* eslint-disable no-undef */
import HTTPService from "services/HttpService";

export default class ConfigurationService extends HTTPService {
  constructor() {
    super();
    this.service = this.createService("configuration");
  }
}
