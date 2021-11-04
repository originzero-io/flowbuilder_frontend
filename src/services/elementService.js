import axios from 'axios';
export const getElementsService = async (flow_id) => {
    const response = await axios.get(`/elements/${flow_id}`);
    return response.data;
}
export const saveElementsService = async (flow_id,elements) => {
    const response = await axios.put(`/elements/save/${flow_id}`, elements);
    return response.data;
}