import React from "react";
import PropTypes from "prop-types";
import { PermissionContent, PermissionHeader } from "../style";
import Checkbox from "../shared/Checkbox";
import CollapsibleMenu, {
  CollapsibleMenuItem,
  CollapsibleSubMenu,
} from "../shared/CollapsibleMenu";
import CheckboxGroup from "../shared/CheckboxGroup";
import FlowList from "../FlowList";
import DashboardList from "../DashboardList";
function ViewProjectPermission({
  projects,
  permissions,
  handleAllChange,
  handleNestedAllChange,
  handleChange,
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
                onChange={(e) => handleAllChange(e, projects)}
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
                        permissions.CAN_EDIT_PROJECT.includes(project._id)
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
                    handleMultiChange={handleChange}
                    handleAllChange={handleNestedAllChange}
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

ViewProjectPermission.propTypes = {
  projects: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleNestedAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ViewProjectPermission;
