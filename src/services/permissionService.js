import axios from "axios";
export const getAllPermissionsService = async () => {
  const response = await axios.get("/permissions/all");
  return response.data;
};
export const getUserPermissionInThisWorkspaceService = async (workspaceId,userId) => {
  const response = await axios.get(`/permissions/${workspaceId}/${userId}`);
  return response.data;
};
export const savePermissionService = async (data) => {
  const response = await axios.post("/permissions/save",data);
  return response.data;
};
