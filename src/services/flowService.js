import axios from 'axios';
export const getFlowService = async (flow_id) => {
    const response = await axios.get(`/flows/${flow_id}`);
    return response.data;
}
export const getAllFlowsService = async () => {
    const response = await axios.get("/flows/all");
    return response.data;
}
export const getFlowsByProjectService = async (project) => {
    const response = await axios.get(`/flows/byProject/${project._id}`);
    return response.data;
}
export const getFlowsByWorkspaceService = async (workspace) => {
    const response = await axios.get(`/flows/byWorkspace/${workspace._id}`);
    return response.data;
}
export const createFlowService = async (params) => {
    const response = await axios.post("/flows/createFlow",params);
    return response.data;
}
export const saveFlowService = async (flow_id,flow) => {
    const response = await axios.put(`/flows/save/${flow_id}`, flow);
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