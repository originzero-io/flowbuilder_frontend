import React from "react";
import { useDispatch } from "react-redux";
import useProject from "hooks/useProject";
import useUserPermission from "hooks/useUserPermission";
import CreateDashboardPermission from "../components/ProjectPermissions/CreateDashboardPermission";
import CreateFlowPermission from "../components/ProjectPermissions/CreateFlowPermission";
import CreateProjectPermission from "../components/ProjectPermissions/CreateProjectPermission";
import DeleteProjectPermission from "../components/ProjectPermissions/DeleteProjectPermission";
import EditProjectPermission from "../components/ProjectPermissions/EditProjectPermission";
import UsageProjectPermission from "../components/ProjectPermissions/UsageProjectPermission";
import ViewProjectPermission from "../components/ProjectPermissions/ViewProjectPermission";
import { PermissionContainer, TabContainer } from "../components/PermissionScreen.style";
import PropTypes from "prop-types";

const propTypes = {
  setSinglePermission: PropTypes.func,
  setMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setMultipleAllPermission: PropTypes.func,
};

export default function ProjectPermissions({
  setSinglePermission,
  setMultiplePermission,
  setSingleAllPermission,
  setMultipleAllPermission,
}) {
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
    dispatch(setSingleAllPermission(e, ids, "project"));
  };
  const handleNestedAllChange = (e, data) => {
    console.log("data:", data);
    console.log("e:", e.target);
    const ids = data.map((d) => d._id);
    dispatch(setMultipleAllPermission(e, ids, "project"));
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

ProjectPermissions.propTypes = propTypes;
