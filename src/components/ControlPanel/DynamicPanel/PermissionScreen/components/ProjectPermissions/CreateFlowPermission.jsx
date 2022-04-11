import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { PermissionContent, PermissionHeader } from "../PermissionScreen.style";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CollapsibleMenu, { CollapsibleMenuItem } from "../CollapsibleMenu";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";

const propTypes = {
  projects: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  handleSingleAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
function CreateFlowPermission({
  projects,
  permissions,
  handleSingleAllChange,
  handleChange,
}) {
  useEffect(() => {
    if (permissions.CAN_CREATE_FLOW.length === projects.length) {
      handleSingleAllChange({
        target: {
          name: "CAN_CREATE_FLOW",
          checked: true,
        },
      });
    }
  }, [permissions.CAN_CREATE_FLOW.length]);
  return (
    <>
      <PermissionHeader>Flow Create</PermissionHeader>
      <PermissionContent>
        <CollapsibleMenu trigger="Projects">
          <CollapsibleMenuItem>
            <CheckboxGroup
              label="All"
              name="CAN_CREATE_FLOW"
              onChange={handleSingleAllChange}
              defaultChecked={permissions.CAN_CREATE_FLOW_ALL}
              disabled={permissions.EVERYTHING}
              checked={
                permissions.EVERYTHING || permissions.CAN_CREATE_FLOW_ALL
              }
            />
          </CollapsibleMenuItem>
          {projects.map((project) => {
            return (
              <CollapsibleMenuItem key={project._id}>
                <CheckboxGroup
                  label={project.name}
                  name="CAN_CREATE_FLOW"
                  id={project._id}
                  onChange={(e) => handleChange(e)}
                  defaultChecked={permissions.CAN_CREATE_FLOW.includes(
                    project._id
                  )}
                  disabled={permissions.EVERYTHING}
                  checked={
                    permissions.EVERYTHING ||
                    permissions.CAN_CREATE_FLOW_ALL ||
                    permissions.CAN_CREATE_FLOW.includes(project._id)
                  }
                />
              </CollapsibleMenuItem>
            );
          })}
        </CollapsibleMenu>
      </PermissionContent>
    </>
  );
}

CreateFlowPermission.propTypes = propTypes;

export default CreateFlowPermission;
