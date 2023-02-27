import ConfigurationService from "../index.http";

class WorkspaceService extends ConfigurationService {
  async getAllWorkspaces() {
    const response = await this.service.get("/workspaces");
    return response.data;
  }

  async getMyWorkspaces() {
    const response = await this.service.get("/workspaces/my-workspaces");
    return response.data;
  }
}

export default new WorkspaceService();
