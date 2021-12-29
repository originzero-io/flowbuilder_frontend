import axios from 'axios';
export const getAllWorkspaces = async () => {
    const response = await axios.get("/workspaces/all");
    return response.data;
}
export const getMyWorkspacesService = async () => {
    const response = await axios.get("/workspaces/my_workspaces");
    return response.data;
}