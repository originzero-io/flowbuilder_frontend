import axios from 'axios';

export const getNotesService = async (workspace) => {
    const response = await axios.get(`/notes/byWorkspace/${workspace._id}`);
    return response.data;
}