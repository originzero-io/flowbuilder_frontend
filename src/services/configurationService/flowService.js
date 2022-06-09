import ConfigurationService from '.';

class FlowService extends ConfigurationService{
    async getFlow(flow_id) {
        const response = await this.service.get(`/flows/${flow_id}`);
        return response.data;
    }
    async getAllFlows() {
        const response = await this.service.get("/flows/all");
        return response.data;
    }
    async getFlowsByProject(project) {
        const response = await this.service.get(`/flows/byProject/${project._id}`);
        return response.data;
    }
    async getFlowsByWorkspace(workspace) {
        const response = await this.service.get(`/flows/byWorkspace/${workspace._id}`);
        return response.data;
    }
    async saveFlow(flow_id, flow) {
        const response = await this.service.put(`/flows/save/${flow_id}`, flow);
        return response.data;
    }
}

export default new FlowService();