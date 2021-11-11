import axios from 'axios';

export const getProjectsService = async () => {
    const response = await axios.get("/projects/all");
    return response.data;
}
export const getProjectsByWorkspaceService = async (workspace) => {
    const response = await axios.get(`/projects/byWorkspace/${workspace._id}`);
    return response.data;
}
export const updateProjectService = async (project,params) => {
    const response = await axios.put(`/projects/${project._id}`,params);
    return response.data;
}
export const createProjectService = async (params) => {
    const response = await axios.post("/projects/createProject",params);
    return response.data;
}
export const deleteProjectService = async (id) => {
    const response = await axios.delete(`/projects/${id}`);
    return response.data;
}