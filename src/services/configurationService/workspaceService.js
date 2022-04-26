import ConfigurationService from ".";

class WorkspaceService extends ConfigurationService {
  async getAllWorkspaces() {
    const response = await this.service.get("/workspaces/all");
    return response.data;
  }
  async getMyWorkspaces() {
    const response = await this.service.get("/workspaces/my_workspaces");
    return response.data;
  }
}

export default new WorkspaceService();