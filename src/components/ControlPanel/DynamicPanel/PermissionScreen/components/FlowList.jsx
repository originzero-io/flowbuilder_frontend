import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFlowsByProjectService } from "services/flowService";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import { CollapsibleMenuItem } from "./CollapsibleMenu";
import useUserPermission from "hooks/useUserPermission";

const propTypes = {
  project: PropTypes.object.required,
  handleMultiChange: PropTypes.func,
  handleAllChange: PropTypes.func,
  permissionName: PropTypes.string,
};
function FlowList({
  project,
  handleMultiChange,
  handleAllChange,
  permissionName,
}) {
  const [flows, setFlows] = useState([]);
  const projectPermissions = useUserPermission("project");
  const PROJECT_NAME = `CAN_${permissionName.toUpperCase()}_PROJECT`;
  const PROJECT_ALL = `CAN_${permissionName.toUpperCase()}_PROJECT_ALL`;
  const FLOW_ALL = `CAN_${permissionName.toUpperCase()}_FLOW_ALL`;
  const FLOW_NAME = `CAN_${permissionName.toUpperCase()}_FLOW`;
  if (permissionName.toUpperCase() === "VIEW") {
    console.log("PROJECT_NAME:", PROJECT_NAME);
    console.log("PROJECT_ALL:", PROJECT_ALL);
    console.log("FLOW_ALL:", FLOW_ALL);
    console.log("FLOW_NAME:", FLOW_NAME);
  }
  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    setFlows(data.flows);
  }, []);
  // const defaultChecked = () => {
  //   console.log("burdayım");
  //   if (
  //     permissionName === "USAGE" ||
  //     permissionName === "EDIT" ||
  //     permissionName === "DELETE" ||
  //     permissionName === "VIEW"
  //   ) {
  //     console.log("evet");
  //     return projectPermissions[`${FLOW_NAME}_ALL`].includes(project._id);
  //   } else {
  //     console.log("hayır");

  //     return projectPermissions[`${FLOW_NAME}_ALL`];
  //   }
  // };
  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name={FLOW_NAME}
                id={project._id}
                onChange={(e) => handleAllChange(e, flows)}
                defaultChecked={projectPermissions[`${FLOW_NAME}_ALL`]}
                disabled={projectPermissions.EVERYTHING}
                checked={
                  projectPermissions.EVERYTHING ||
                  projectPermissions[PROJECT_ALL] ||
                  projectPermissions[`${FLOW_NAME}_ALL`].includes(project._id) ||
                  projectPermissions[PROJECT_NAME].includes(project._id)
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {flows.map((flow) => {
            return (
              <CollapsibleMenuItem key={flow._id}>
                <CheckboxGroup label={flow.config.name}>
                  <Checkbox
                    name={FLOW_NAME}
                    id={flow._id}
                    onChange={(e) => handleMultiChange(e)}
                    //defaultChecked={projectPermissions[FLOW_NAME].includes(flow._id)}
                    disabled={
                      projectPermissions.EVERYTHING ||
                      (permissionName === "VIEW" &&
                        (projectPermissions.CAN_EDIT_FLOW.includes(flow._id) ||
                          projectPermissions.CAN_USAGE_FLOW.includes(flow._id) ||
                          projectPermissions.CAN_DELETE_FLOW.includes(flow._id)))
                    }
                    //checked={projectPermissions.CAN_EDIT_FLOW.includes(flow._id)}
                    checked={
                      projectPermissions.EVERYTHING ||
                      projectPermissions[PROJECT_ALL] ||
                      projectPermissions[PROJECT_NAME].includes(project._id) ||
                      projectPermissions[FLOW_ALL].includes(project._id) ||
                      projectPermissions[FLOW_NAME].includes(flow._id)
                      // (permissionName === "VIEW"
                      //   ? projectPermissions.CAN_VIEW_FLOW.includes(flow._id)
                      //   : projectPermissions[FLOW_NAME].includes(flow._id))
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
FlowList.propTypes = propTypes;

export default FlowList;
