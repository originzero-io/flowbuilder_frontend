import React, { useContext } from "react";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import { PermissionHeader, PermissionContent } from "../PermissionScreen.style";
import PropTypes from "prop-types";
import CollapsibleMenu, { CollapsibleMenuItem } from "../CollapsibleMenu";
import PermissionContext from "../../context/PermissionContext";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  handleAllChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default function UsageDevicePermission({
  permissions,
  handleAllChange,
  handleChange,
}) {
  const { controllers, processors } = useContext(PermissionContext);
  return (
    <>
      <PermissionHeader>Usage</PermissionHeader>
      <PermissionContent>
        <CollapsibleMenu trigger="Controllers">
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name="CAN_USAGE_CONTROLLER"
                onChange={handleAllChange}
                defaultChecked={permissions.CAN_USAGE_CONTROLLER_ALL}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING || permissions.CAN_USAGE_CONTROLLER_ALL
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {controllers.map((controller) => {
            return (
              <CollapsibleMenuItem key={controller._id}>
                <CheckboxGroup label={controller.name}>
                  <Checkbox
                    name="CAN_USAGE_CONTROLLER"
                    id={controller._id}
                    onChange={(e) => handleChange(e)}
                    defaultChecked={permissions.CAN_USAGE_CONTROLLER.includes(
                      controller._id
                    )}
                    disabled={permissions.EVERYTHING}
                    checked={
                      permissions.EVERYTHING ||
                      permissions.CAN_USAGE_CONTROLLER_ALL ||
                      permissions.CAN_USAGE_CONTROLLER.includes(controller._id)
                    }
                  />
                </CheckboxGroup>
              </CollapsibleMenuItem>
            );
          })}
        </CollapsibleMenu>
        <CollapsibleMenu trigger="Processors">
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name="CAN_USAGE_PROCESSOR"
                onChange={(e) => handleAllChange(e, controllers)}
                defaultChecked={permissions.CAN_USAGE_PROCESSOR_ALL}
                disabled={permissions.EVERYTHING}
                checked={
                  permissions.EVERYTHING || permissions.CAN_USAGE_PROCESSOR_ALL
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {processors.map((processor) => {
            return (
              <CollapsibleMenuItem key={processor._id}>
                <CheckboxGroup label={processor.name}>
                  <Checkbox
                    name="CAN_USAGE_PROCESSOR"
                    id={processor._id}
                    onChange={(e) => handleChange(e)}
                    //checked={processor.canUse}
                    defaultChecked={permissions.CAN_USAGE_PROCESSOR.includes(
                      processor._id
                    )}
                    disabled={permissions.EVERYTHING}
                    checked={
                      permissions.EVERYTHING ||
                      permissions.CAN_USAGE_PROCESSOR_ALL ||
                      permissions.CAN_USAGE_PROCESSOR.includes(processor._id)
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

UsageDevicePermission.propTypes = propTypes;
