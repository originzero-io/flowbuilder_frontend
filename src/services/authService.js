import axios from 'axios';
import { setAuthorizationToken } from "../app-global/helpers/httpHelpers";
export const loginService = async (user) => {
    const response = await axios.post("/auth/login", user);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    setAuthorizationToken(token);
    return response.data;
}
export const registerService = async (user) => {
    const response = await axios.post("/auth/register", user);
    return response.data;
}

export const logoutService = () => {
    localStorage.removeItem("token");
    setAuthorizationToken(false);
}
