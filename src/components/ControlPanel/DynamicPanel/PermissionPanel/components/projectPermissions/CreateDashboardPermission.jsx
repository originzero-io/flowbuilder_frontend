import React from "react";
import PropTypes from "prop-types";
import { PermissionContent, PermissionHeader } from "../style";
import Checkbox from "../shared/Checkbox";
import CollapsibleMenu, { CollapsibleMenuItem } from "../shared/CollapsibleMenu";
import CheckboxGroup from "../shared/CheckboxGroup";

function CreateDashboardPermission({
  projects,
  permissions,
  handleAllChange,
  handleChange,
}) {
  return (
    <>
      <PermissionHeader>Dashboard Create</PermissionHeader>
      <PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name="CAN_CREATE_DASHBOARD"
                onChange={(e) => handleAllChange(e, projects)}
                defaultChecked={permissions.CAN_CREATE_DASHBOARD_ALL}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING || permissions.CAN_CREATE_DASHBOARD_ALL
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {projects.map((project) => {
            return (
              <CollapsibleMenuItem key={project._id}>
                <CheckboxGroup label={project.name}>
                  <Checkbox
                    name="CAN_CREATE_DASHBOARD"
                    id={project._id}
                    onChange={(e) => handleChange(e)}
                    defaultChecked={permissions.CAN_CREATE_DASHBOARD.includes(
                      project._id
                    )}
                    disabled={permissions.EVERYTHING}
                    checked={
                      permissions.EVERYTHING ||
                      permissions.CAN_CREATE_DASHBOARD_ALL ||
                      permissions.CAN_CREATE_DASHBOARD.includes(project._id)
                    }
                  />
                </CheckboxGroup>
              </CollapsibleMenuItem>
            );
          })}
        </CollapsibleMenu>
      </PermissionContent>
    </>
  );
}

CreateDashboardPermission.propTypes = {
  projects: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CreateDashboardPermission;