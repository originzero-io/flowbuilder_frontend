import React from "react";
import { useDispatch } from "react-redux";
import useProject from "hooks/useProject";
import PropTypes from "prop-types";
import CreateDashboardPermission from "../components/ProjectPermissions/CreateDashboardPermission";
import CreateFlowPermission from "../components/ProjectPermissions/CreateFlowPermission";
import CreateProjectPermission from "../components/ProjectPermissions/CreateProjectPermission";
import EditProjectPermission from "../components/ProjectPermissions/EditProjectPermission";
import UsageProjectPermission from "../components/ProjectPermissions/UsageProjectPermission";
import ViewProjectPermission from "../components/ProjectPermissions/ViewProjectPermission";
import { PermissionContainer, TabContainer } from "../components/PermissionScreen.style";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  setSinglePermission: PropTypes.func,
  setMultiplePermission: PropTypes.func,
  setNestedMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setNestedAllPermission: PropTypes.func,
};
export default function ProjectPermissions({
  permissions,
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setNestedAllPermission,
}) {
  const dispatch = useDispatch();
  const { projects } = useProject();

  const handleSingleProjectChange = (e) => {
    dispatch(setSinglePermission({ event: e, permissionType: "project" }));
  };
  const handleMultiProjectChange = (e) => {
    dispatch(setMultiplePermission({ event: e, permissionType: "project" }));
  };
  const handleSingleAllChange = (e) => {
    dispatch(setSingleAllPermission({ event: e, permissionType: "project" }));
  };
  const handleNestedAllChange = (e) => {
    dispatch(setNestedAllPermission({ event: e, permissionType: "project" }));
  };
  const handleNestedMultiChange = (e, flow) => {
    const { _id, project } = flow;
    const flowData = {
      flowId: _id,
      projectId: project._id,
    };
    dispatch(setNestedMultiplePermission({ event: e, flowData, permissionType: "project" }));
  };

  // console.log('projects permissions rendered');
  return (
    <TabContainer>
      <PermissionContainer size="50%">
        <CreateProjectPermission
          permissions={permissions}
          handleChange={handleSingleProjectChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <CreateDashboardPermission
          projects={projects}
          permissions={permissions}
          handleChange={handleMultiProjectChange}
          handleSingleAllChange={handleSingleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <CreateFlowPermission
          projects={projects}
          permissions={permissions}
          handleChange={handleMultiProjectChange}
          handleSingleAllChange={handleSingleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditProjectPermission
          projects={projects}
          permissions={permissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <UsageProjectPermission
          projects={projects}
          permissions={permissions}
          handleChange={handleMultiProjectChange}
          handleNestedMultiChange={handleNestedMultiChange}
          handleSingleAllChange={handleSingleAllChange}
          handleNestedAllChange={handleNestedAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <ViewProjectPermission
          projects={projects}
          permissions={permissions}
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
