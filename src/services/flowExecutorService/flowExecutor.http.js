/* eslint-disable no-undef */
import HttpClient from "services/HttpClient";

class FlowExecutorHttpService extends HttpClient {
  constructor(port) {
    super();
    this.service = this.createService({ port });
  }

  async getElements() {
    const response = await this.service.get("/test/elements");
    return response.data;
  }
}

export default FlowExecutorHttpService;
