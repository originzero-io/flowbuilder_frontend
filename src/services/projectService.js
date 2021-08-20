import axios from 'axios';

export const getProjectsService = async () => {
    const response = await axios.get("/projects/getAll");
    return response.data;
}
export const getProjectsByTeamService = async (teamId) => {
    const response = await axios.get(`/projects/byTeam/${teamId}`);
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