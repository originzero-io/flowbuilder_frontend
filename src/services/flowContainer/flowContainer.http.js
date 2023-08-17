/* eslint-disable no-undef */
import axios from "axios";

class FlowContainerHttpService {
  constructor(port) {
    this.service = axios.create({
      baseURL: `http://localhost:${port}`,
    });
  }
  async getElements() {
    const response = await this.service.get("/elements");
    return response.data;
  }
}

export default FlowContainerHttpService;
