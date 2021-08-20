import axios from 'axios';
export const getFlowsService = async () => {
    const response = await axios.get("/flows/getAll");
    return response.data;
}
export const getFlowByProjectService = async (projectId) => {
    const response = await axios.get(`/flows/byProject/${projectId}`);
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
export const moveFlowService = async (flowId, projectId) => {
    const response = await axios.put(`/flows/move/${flowId}`, { projectId });
    return response.data;
}
export const editFlowConfigService = async (flowId,flowConfig) => {
    const response = await axios.put(`/flows/config/${flowId}`, { flowConfig });
    return response.data;
}