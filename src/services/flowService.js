import axios from 'axios';
export const getFlowsService = async () => {
    const response = await axios.get("/flows/all");
    return response.data;
}
export const getFlowsByProjectService = async (project) => {
    const response = await axios.get(`/flows/byProject/${project._id}`);
    return response.data;
}
export const getFlowsByTeamService = async (team) => {
    const response = await axios.get(`/flows/byTeam/${team._id}`);
    return response.data;
}
export const createFlowService = async (params) => {
    const response = await axios.post("/flows/createFlow",params);
    return response.data;
}
export const deleteFlowService = async (id) => {
    const response = await axios.delete(`/flows/${id}`);
    return response.data;
}
export const moveFlowService = async (flowId, project) => {
    const response = await axios.put(`/flows/move/${flowId}`, { project });
    return response.data;
}
export const editFlowConfigService = async (flowId,flowConfig) => {
    const response = await axios.put(`/flows/config/${flowId}`, { flowConfig });
    return response.data;
}