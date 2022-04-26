import ConfigurationService from '.';

class FlowGroupService extends ConfigurationService{
    async getGroups(flow_id) {
        const response = await this.service.get(`/flows/${flow_id}/groups`);
        return response.data;
    }
    async createGroup(flow_id,group) {
        const response = await this.service.post(`/flows/${flow_id}/createGroup`,group);
        return response.data;
    }
    async updateGroup(group) {
        const response = await this.service.put(`/flows/group/${group._id}`,group);
        return response.data;
    }
    async deleteGroup(group) {
        const response = await this.service.delete(`/flows/group/${group._id}`);
        return response.data;
    }
}

export default new FlowGroupService();