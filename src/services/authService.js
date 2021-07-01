import axios from 'axios';
export const checkAPI = async () => {
    const response = await axios.get("/users");
    return response.data;
}
export const loginService = async (user) => {
    const response = await axios.post("/users/login",user);
    return response.data;
}

export const logoutService = () => {
    //localStorage.removeItem("jwtToken");
}
