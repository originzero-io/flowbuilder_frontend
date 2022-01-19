import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFlowsByProjectService } from "../../../../../services/flowService";
import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";
import { CollapsibleMenuItem } from "./CollapsibleMenu";
import useUserPermission from "../../../../../utils/useUserPermission";

function FlowList({ project, handleMultiChange, permissionName }) {
  const [flows, setFlows] = useState([]);
  const permissions = useUserPermission("project");
  //console.log(`CAN_${permissionName}_FLOW`)
  const name = `CAN_${permissionName.toUpperCase()}_FLOW`
  //console.log("NAME:",permissionName)
  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    setFlows(data.flows);
  }, []);
  //const is
  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox name="processorCreate" />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {flows.map((flow) => {
            return (
              <CollapsibleMenuItem key={flow._id}>
                <CheckboxGroup label={flow.config.name}>
                  <Checkbox
                    name={name}
                    id={flow._id}
                    onChange={(e) => handleMultiChange(e)}
                    defaultChecked={permissions[name].includes(flow._id)}
                    disabled={permissionName === "VIEW" && permissions.CAN_EDIT_FLOW.includes(flow._id)}
                    //checked={permissions.CAN_EDIT_FLOW.includes(flow._id)}
                    checked={permissionName === "VIEW" ? permissions.CAN_VIEW_FLOW.includes(flow._id) : permissions[name].includes(flow._id)}
                  />
                </CheckboxGroup>
              </CollapsibleMenuItem>
            );
          })}
        </>
      ) : (
        <div style={{ paddingLeft: "10px", fontSize: "1.3vmin" }}>
          No flow in this project
        </div>
      )}
    </>
  );
}

FlowList.propTypes = {
  project: PropTypes.object.required,
  handleMultiChange: PropTypes.func,
  permissionName: PropTypes.string,
};

export default FlowList;
