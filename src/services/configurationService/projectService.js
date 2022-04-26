import ConfigurationService from ".";

class ProjectService extends ConfigurationService {
  async getProjects() {
    const response = await this.service.get("/projects/all");
    return response.data;
  }
  async getProjectsByWorkspace(workspace) {
    const response = await this.service.get(`/projects/byWorkspace/${workspace._id}`);
    return response.data;
  }
}

export default new ProjectService();