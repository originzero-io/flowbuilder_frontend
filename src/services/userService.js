import axios from "axios";
export const getAllUsersService = async () => {
  const response = await axios.get("/users/getAll");
  return response.data;
};
export const getMeService = async () => {
  const response = await axios.get("/users/me");
  return response.data;
};
export const registerService = async (user) => {
    const response = await axios.post("/auth/register", user);
    return response.data;
}
export const editUserService = async (user) => {
    const response = await axios.put(`/users/${user._id}`, user);
    return response.data;
}
export const deleteUserService = async (user) => {
    const response = await axios.delete(`/users/${user._id}`);
    console.log("response:", response);
  return response.data;
};
