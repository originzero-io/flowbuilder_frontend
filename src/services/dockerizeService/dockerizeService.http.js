/* eslint-disable no-undef */
import HttpClient from "services/HttpClient";

class DockerizeService extends HttpClient {
  constructor() {
    super();
    this.service = this.createService("dockerize");
  }
  async getAvailablePort() {
    const response = await this.service.get("/free-port");
    return response.data;
  }
  async dockerizeFlow(flowId) {
    const response = await this.service.post(`/flow/${flowId}`);
    return response.data;
  }
  async deleteFlowContainer(flowId) {
    const response = await this.service.delete(`/flow/${flowId}`);
    return response.data;
  }
}

export default new DockerizeService();
