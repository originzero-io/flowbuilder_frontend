import axios from 'axios'
export const getAllUsers = async () => {
    try {
        const response = await axios.get("/users/getAll");
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}
export const getMe = async () => {
    try {
        const response = await axios.get("/users/me");
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}