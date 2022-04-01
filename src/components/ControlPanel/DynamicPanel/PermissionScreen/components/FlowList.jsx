import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFlowsByProjectService } from "services/flowService";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import { CollapsibleMenuItem } from "./CollapsibleMenu";
import useUserPermission from "hooks/useUserPermission";
import useDidMountEffect from "hooks/useDidMountEffect";

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
  const PROJECT_NAME = `CAN_${permissionName}_PROJECT`;
  const PROJECT_ALL = `CAN_${permissionName}_PROJECT_ALL`;
  const FLOW_ALL = `CAN_${permissionName}_FLOW_ALL`;
  const FLOW_NAME = `CAN_${permissionName}_FLOW`;

  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    setFlows(data.flows);
  }, []);

  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name={FLOW_NAME}
                id={project._id}
                onChange={handleAllChange}
                defaultChecked={projectPermissions[`${FLOW_NAME}_ALL`]}
                disabled={
                  projectPermissions.EVERYTHING ||
                  projectPermissions[PROJECT_ALL] ||
                  projectPermissions[PROJECT_NAME].includes(project._id) ||
                  (permissionName === "VIEW" &&
                    (
                      projectPermissions.CAN_VIEW_PROJECT_ALL ||
                      projectPermissions.CAN_USAGE_FLOW_ALL.includes(project._id) ||
                      projectPermissions.CAN_EDIT_FLOW_ALL.includes(project._id) ||
                      projectPermissions.CAN_DELETE_FLOW_ALL.includes(project._id)
                    )
                  )
                }
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
                    onChange={(e) => handleMultiChange(e,flow)}
                    //defaultChecked={projectPermissions[FLOW_NAME].includes(flow._id)}
                    disabled={
                      projectPermissions.EVERYTHING ||
                      projectPermissions[PROJECT_ALL] ||
                      projectPermissions[PROJECT_NAME].includes(flow.project._id) ||
                      (permissionName === "VIEW" &&
                        (
                          projectPermissions.CAN_VIEW_PROJECT_ALL ||
                        
                          projectPermissions.CAN_EDIT_FLOW.some(f=>f.id === flow._id) ||
                          projectPermissions.CAN_USAGE_FLOW.some(f=>f.id === flow._id) ||
                          projectPermissions.CAN_DELETE_FLOW.some(f => f.id === flow._id) ||
                        
                          projectPermissions.CAN_USAGE_FLOW_ALL.includes(project._id) ||
                          projectPermissions.CAN_EDIT_FLOW_ALL.includes(project._id) ||
                          projectPermissions.CAN_DELETE_FLOW_ALL.includes(project._id)
                        )
                      )
                    }
                    checked={
                      projectPermissions.EVERYTHING ||
                      projectPermissions[PROJECT_ALL] ||
                      projectPermissions[PROJECT_NAME].includes(project._id) ||
                      projectPermissions[FLOW_ALL].includes(project._id) ||
                      projectPermissions[FLOW_NAME].some(f=>f.id === flow._id) ||
                      (permissionName === "VIEW" && (
                        projectPermissions.CAN_EDIT_FLOW.some(f=>f.id === flow._id) ||
                        projectPermissions.CAN_USAGE_FLOW.some(f=>f.id === flow._id) ||
                        projectPermissions.CAN_DELETE_FLOW.some(f => f.id === flow._id)
                      ))
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
