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
};
export const addUserToWorkspaceService = async (user, workspace) => {
  const response = await axios.post(`/users/${user._id}/workspace`, {
    workspace_id: workspace._id,
  });
  return response.data;
};
export const removeUserToWorkspaceService = async (user, workspace) => {
  //body object should send with "data" key in delete requests
  const response = await axios.delete(`/users/${user._id}/workspace`, {
    data: {workspace_id: workspace._id},
  });
  return response.data;
};
export const editUserService = async (user) => {
  const response = await axios.put(`/users/${user._id}`, user);
  return response.data;
};
export const deleteUserService = async (user) => {
  const response = await axios.delete(`/users/${user._id}`);
  console.log("response:", response);
  return response.data;
};
