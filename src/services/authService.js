import axios from 'axios';
import { setAuthorizationToken } from "../app-global/helpers/httpHelpers";
export const checkAPI = async () => {
    try {
        const response = await axios.get("/users/getAll");
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}
export const loginService = async (user) => {
    const response = await axios.post("/users/login", user);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    setAuthorizationToken(token);
    //setAuthorizationToken(token);
    return response.data;
}

export const logoutService = () => {
    localStorage.removeItem("token");
    setAuthorizationToken(false);
}
