import axios from 'axios';
import { setAuthorizationToken } from "utils/httpHelpers";
export const loginService = async (user) => {
    const response = await axios.post("/auth/login", user);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    setAuthorizationToken(token);
    return response.data;
}
export const getMeService = async (token) => {
    setAuthorizationToken(token);
    const response = await axios.get("/auth/me");
    return response.data;
}

export const logoutService = () => {
    localStorage.removeItem("token");
    setAuthorizationToken(false);
}
