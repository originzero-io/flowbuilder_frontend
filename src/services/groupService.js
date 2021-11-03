import axios from 'axios';
export const getGroupsService = async (flow_id) => {
    const response = await axios.get(`/flows/${flow_id}/groups`);
    return response.data;
}
export const createGroupService = async (flow_id,group) => {
    const response = await axios.post(`/flows/${flow_id}/createGroup`,group);
    return response.data;
}
export const updateGroupService = async (group) => {
    const response = await axios.put(`/flows/group/${group._id}`,group);
    return response.data;
}
export const deleteGroupService = async (group) => {
    const response = await axios.delete(`/flows/group/${group._id}`);
    return response.data;
}
