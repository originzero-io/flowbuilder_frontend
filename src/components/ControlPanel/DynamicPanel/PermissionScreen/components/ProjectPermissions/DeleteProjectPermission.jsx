import React from "react";
import PropTypes from "prop-types";
import { PermissionContent, PermissionHeader } from "../PermissionScreen.style";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CollapsibleMenu, {
  CollapsibleMenuItem,
  CollapsibleSubMenu,
} from "../CollapsibleMenu";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import FlowList from "../FlowList";
import DashboardList from "../DashboardList";

const propTypes = {
  projects: PropTypes.array.isRequired,
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNestedMultiChange: PropTypes.func.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleNestedAllChange: PropTypes.func.isRequired,
};
function DeleteProjectPermission({
  projects,
  permissions,
  handleChange,
  handleNestedMultiChange,
  handleAllChange,
  handleNestedAllChange,
}) {
  return (
    <>
      <PermissionHeader>Delete</PermissionHeader>
      <PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name="CAN_DELETE_PROJECT"
                onChange={handleAllChange}
                defaultChecked={permissions.CAN_DELETE_PROJECT_ALL}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING || permissions.CAN_DELETE_PROJECT_ALL
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {projects.map((project) => {
            return (
              <CollapsibleSubMenu key={project._id} trigger={`${project.name}`}>
                <CollapsibleMenuItem>
                  <CheckboxGroup label="This project">
                    <Checkbox
                      name="CAN_DELETE_PROJECT"
                      id={project._id}
                      onChange={(e) => handleChange(e)}
                      defaultChecked={permissions.CAN_DELETE_PROJECT.includes(
                        project._id
                      )}
                      disabled={permissions.EVERYTHING}
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_DELETE_PROJECT_ALL ||
                        permissions.CAN_DELETE_PROJECT.includes(project._id)
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
                <CollapsibleSubMenu trigger="Flows">
                  <FlowList
                    project={project}
                    handleMultiChange={handleNestedMultiChange}
                    handleNestedAllChange={handleNestedAllChange}
                    permissionName="DELETE"
                  />
                </CollapsibleSubMenu>
                <CollapsibleSubMenu trigger="Dashboards" open={false}>
                  <DashboardList project={project} />
                </CollapsibleSubMenu>
              </CollapsibleSubMenu>
            );
          })}
        </CollapsibleMenu>
      </PermissionContent>
    </>
  );
}

DeleteProjectPermission.propTypes = propTypes;

export default DeleteProjectPermission;
