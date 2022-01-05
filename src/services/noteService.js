import axios from 'axios';

export const getNotesService = async () => {
    const response = await axios.get("/notes/all");
    return response.data;
}