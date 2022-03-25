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
  setMultipleAllPermission: PropTypes.func,
};

export default function ProjectPermissions({
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setMultipleAllPermission,
}) {
  const dispatch = useDispatch();
  const { projects } = useProject();
  const projectPermissions = useUserPermission("project");
  const handleSingleProjectChange = (e) => {
    console.warn("SINGLE_PROJECT_CHANGE çalıştı");

    dispatch(setSinglePermission(e, "project"));
  };
  const handleMultiProjectChange = (e) => {
    //console.log("handleMultiChange:", e.target);
    console.warn("MULTI_CHANGE çalıştı");
  
    dispatch(setMultiplePermission(e, "project"));
  };
  const handleAllChange = (e) => {
    console.warn("ALL_CHANGE çalıştı");
    dispatch(setSingleAllPermission(e, "project"));
  };
  const handleMultiAllChange = (e) => {
    console.warn("MULTI_ALL_CHANGE çalıştı");
    dispatch(setMultipleAllPermission(e, "project"));
  };
  const handleNestedMultiChange = (e, flow) => {
    const { _id, project } = flow;
    const flowData = {
      id: _id,
      projectId:project._id
    }
    console.warn("NESTED_MULTI_CHANGE çalıştı")
    console.log("flowData:", flowData);
    //console.log("e:", e.target);
    //const ids = data.map((d) => d._id);

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
          handleNestedChange={handleNestedMultiChange}
          handleAllChange={handleAllChange}
          handleMultiAllChange={handleMultiAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedChange={handleNestedMultiChange}
          handleAllChange={handleAllChange}
          handleMultiAllChange={handleMultiAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <DeleteProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedChange={handleNestedMultiChange}
          handleAllChange={handleAllChange}
          handleMultiAllChange={handleMultiAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <ViewProjectPermission
          projects={projects}
          permissions={projectPermissions}
          handleChange={handleMultiProjectChange}
          handleNestedChange={handleNestedMultiChange}
          handleAllChange={handleAllChange}
          handleMultiAllChange={handleMultiAllChange}
        />
      </PermissionContainer>
    </TabContainer>
  );
}

ProjectPermissions.propTypes = propTypes;
