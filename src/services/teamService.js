import axios from 'axios';
export const getTeamsService = async () => {
    const response = await axios.get("/teams/getAll");
    return response.data;
}
export const createTeamService = async (params) => {
    const response = await axios.post("/teams/createTeam",params);
    return response.data;
}
export const editTeamService = async (id,params) => {
    const response = await axios.put(`/teams/${id}`,params);
    return response.data;
}
export const deleteTeamService = async (id) => {
    const response = await axios.delete(`/teams/${id}`);
    return response.data;
}