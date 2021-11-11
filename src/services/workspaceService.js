import axios from 'axios';
export const getWorkspacesService = async () => {
    const response = await axios.get("/workspaces/all");
    return response.data;
}
export const createWorkspaceService = async (params) => {
    const response = await axios.post("/workspaces/createWorkspace",params);
    return response.data;
}
export const editWorkspaceService = async (id,params) => {
    const response = await axios.put(`/workspaces/${id}`,params);
    return response.data;
}
export const deleteWorkspaceService = async (workspace) => {
    const response = await axios.delete(`/workspaces/${workspace._id}`);
    return response.data;
}