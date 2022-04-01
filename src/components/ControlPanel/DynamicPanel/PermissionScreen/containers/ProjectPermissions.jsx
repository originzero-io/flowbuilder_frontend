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
  setNestedMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setNestedAllPermission: PropTypes.func,
};

export default function ProjectPermissions({
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setNestedAllPermission,
}) {
  const dispatch = useDispatch();
  const { projects } = useProject();
  const projectPermissions = useUserPermission("project");

  const handleSingleProjectChange = (e) => {
    dispatch(setSinglePermission(e, "project"));
  };
  const handleMultiProjectChange = (e) => {
    dispatch(setMultiplePermission(e, "project"));
  };
  const handleSingleAllChange = (e) => {
    dispatch(setSingleAllPermission(e, "project"));
  };
  const handleNestedAllChange = (e) => {
    dispatch(setNestedAllPermission(e, "project"));
  };
  const handleNestedMultiChange = (e, flow) => {
    const { _id, project } = flow;
    const flowData = {
      id: _id,
      projectId:project._id
    }    
    dispatch(setNestedMultiplePermission(e, flowData,"project"));
  };

  //console.log('projects permissions rendered');
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
          handleSingleAllChange={handleSingleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <CreateFlowPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleSingleAllChange={handleSingleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <UsageProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <DeleteProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <ViewProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
    </TabContainer>
  );
}

ProjectPermissions.propTypes = propTypes;
