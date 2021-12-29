import axios from 'axios';

export const getProjectsService = async () => {
    const response = await axios.get("/projects/all");
    return response.data;
}
export const getProjectsByWorkspaceService = async (workspace) => {
    const response = await axios.get(`/projects/byWorkspace/${workspace._id}`);
    return response.data;
}