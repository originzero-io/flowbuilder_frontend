import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFlowsByProjectService } from "../../../../../services/flowService";
import CheckboxGroup from "./shared/CheckboxGroup";
import Checkbox from "./shared/Checkbox";
import { CollapsibleMenuItem } from "./shared/CollapsibleMenu";
import useUserPermission from "../../../../../utils/useUserPermission";

function FlowList({
  project,
  handleMultiChange,
  handleAllChange,
  permissionName,
}) {
  const [flows, setFlows] = useState([]);
  const permissions = useUserPermission("project");
  //console.log(`CAN_${permissionName}_FLOW`)
  const name = `CAN_${permissionName.toUpperCase()}_FLOW`;
  const PROJECT_NAME = `CAN_${permissionName.toUpperCase()}_PROJECT`;
  const ALL_NAME = `CAN_${permissionName.toUpperCase()}_FLOW_ALL`;
  console.log("NAME:", name);
  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    setFlows(data.flows);
  }, []);
  const defaultChecked = () => {
    console.log("burdayım");
    if (
      permissionName === "USAGE" ||
      permissionName === "EDIT" ||
      permissionName === "DELETE" ||
      permissionName === "VIEW"
    ) {
      console.log("evet");
      return permissions[`${name}_ALL`].includes(project._id);
    } else {
      console.log("hayır");

      return permissions[`${name}_ALL`];
    }
  };
  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name={name}
                id={project._id}
                onChange={(e) => handleAllChange(e, flows)}
                //defaultChecked={defaultChecked()}
                defaultChecked={permissions[`${name}_ALL`]}
                disabled={permissions.EVERYTHING}
                //checked={permissions.EVERYTHING || defaultChecked()}
                //checked={permissions.EVERYTHING || permissions[`${name}_ALL`]}
                checked={
                  permissions.EVERYTHING ||
                  permissions[`${name}_ALL`].includes(project._id)
                }
              />
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
                    disabled={
                      permissions.EVERYTHING ||
                      (permissionName === "VIEW" &&
                        (permissions.CAN_EDIT_FLOW.includes(flow._id) ||
                          permissions.CAN_USAGE_FLOW.includes(flow._id) ||
                          permissions.CAN_DELETE_FLOW.includes(flow._id)))
                    }
                    //checked={permissions.CAN_EDIT_FLOW.includes(flow._id)}
                    checked={
                      permissions.EVERYTHING ||
                      permissions[PROJECT_NAME].includes(project._id) ||
                      permissions[ALL_NAME].includes(project._id) ||
                      (permissionName === "VIEW"
                        ? permissions.CAN_VIEW_FLOW.includes(flow._id)
                        : permissions[name].includes(flow._id))
                    }
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
/*Her şey tiklenmiş mi ?
Bu projeninin*/
FlowList.propTypes = {
  project: PropTypes.object.required,
  handleMultiChange: PropTypes.func,
  handleAllChange: PropTypes.func,
  permissionName: PropTypes.string,
};

export default FlowList;
