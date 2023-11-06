import ConfigurationService from "../configurationService.http";

class ProjectService extends ConfigurationService {
  async getProjects() {
    const response = await this.service.get("/projects");
    return response.data;
  }

  async getProjectsByWorkspace(workspace) {
    const response = await this.service.get(`/projects/workspace/${workspace._id}`);
    return response.data;
  }
}

export default new ProjectService();
