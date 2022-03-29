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
  projects: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNestedChange: PropTypes.func.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleMultiAllChange: PropTypes.func.isRequired,
};
function ViewProjectPermission({
  projects,
  permissions,
  handleChange,
  handleNestedChange,
  handleAllChange,
  handleMultiAllChange,
}) {
  return (
    <>
      <PermissionHeader>View</PermissionHeader>
      <PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name="CAN_VIEW_PROJECT"
                onChange={handleAllChange}
                defaultChecked={permissions.CAN_VIEW_PROJECT_ALL}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING || permissions.CAN_VIEW_PROJECT_ALL
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
                      name="CAN_VIEW_PROJECT"
                      id={project._id}
                      onChange={(e) => handleChange(e)}
                      defaultChecked={permissions.CAN_VIEW_PROJECT.includes(
                        project._id
                      )}
                      disabled={
                        permissions.EVERYTHING ||
                        permissions.CAN_USAGE_PROJECT.includes(project._id) ||
                        permissions.CAN_EDIT_PROJECT.includes(project._id) ||
                        permissions.CAN_DELETE_PROJECT.includes(project._id)
                      }
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_VIEW_PROJECT_ALL ||
                        permissions.CAN_VIEW_PROJECT.includes(project._id)
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
                <CollapsibleSubMenu trigger="Flows">
                  <FlowList
                    project={project}
                    handleMultiChange={handleNestedChange}
                    handleAllChange={handleMultiAllChange}
                    permissionName="VIEW"
                  />
                </CollapsibleSubMenu>
                <CollapsibleSubMenu trigger="Dashboards">
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

ViewProjectPermission.propTypes = propTypes;

export default ViewProjectPermission;
