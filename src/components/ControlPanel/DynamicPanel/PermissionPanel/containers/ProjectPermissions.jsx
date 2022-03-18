import React from "react";
import { useDispatch } from "react-redux";
import {
  setAllPermission,
  setMultiplePermission,
  setNestedAllPermission,
  setSinglePermission
} from "../../../../../store/reducers/userPermissionReducer";
import useProject from "../../../../../utils/useProject";
import useUserPermission from "../../../../../utils/useUserPermission";
import CreateDashboardPermission from "../components/projectPermissions/CreateDashboardPermission";
import CreateFlowPermission from "../components/projectPermissions/CreateFlowPermission";
import CreateProjectPermission from "../components/projectPermissions/CreateProjectPermission";
import DeleteProjectPermission from "../components/projectPermissions/DeleteProjectPermission";
import EditProjectPermission from "../components/projectPermissions/EditProjectPermission";
import UsageProjectPermission from "../components/projectPermissions/UsageProjectPermission";
import ViewProjectPermission from "../components/projectPermissions/ViewProjectPermission";
import {
  PermissionContainer, TabContainer
} from "../components/style";
export default function ProjectPermissions() {
  const dispatch = useDispatch();
  const { projects } = useProject();
  const projectPermissions = useUserPermission("project");
  const handleSingleProjectChange = (e) => {
    console.log("handleChange:", e);
    dispatch(setSinglePermission(e, "project"));
  };
  const handleMultiProjectChange = (e) => {
    console.log("handleMultiChange:", e.target);
    dispatch(setMultiplePermission(e, "project"));
  };
  const handleAllChange = (e, data) => {
    console.log("data:", data);
    console.log("e:", e.target);
    const ids = data.map((d) => d._id);
    dispatch(setAllPermission(e, ids, "project"));
  };
  const handleNestedAllChange = (e, data) => {
    console.log("data:", data);
    console.log("e:", e.target);
    const ids = data.map((d) => d._id);
    dispatch(setNestedAllPermission(e, ids, "project"));
  };
  return (
    <TabContainer>
      <PermissionContainer size="50%">
        <CreateProjectPermission
          permissions={projectPermissions}
          handleChange={handleSingleProjectChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <CreateDashboardPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <CreateFlowPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <UsageProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <DeleteProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <ViewProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleAllChange={handleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
    </TabContainer>
  );
}
