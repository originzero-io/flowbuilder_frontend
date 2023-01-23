import ConfigurationService from ".";

class FlowElementService extends ConfigurationService {
  async getElements(flow_id) {
    const response = await this.service.get(`/elements/${flow_id}`);
    return response.data;
  }
  async saveElements(flow_id,elements) {
    const response = await this.service.put(`/elements/${flow_id}`, elements);
    return response.data;
  }
}

export default new FlowElementService();