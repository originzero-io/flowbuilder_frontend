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
  const CAN_X_PROJECT = `CAN_${permissionName}_PROJECT`;
  const CAN_X_PROJECT_ALL = `CAN_${permissionName}_PROJECT_ALL`;
  const CAN_X_FLOW = `CAN_${permissionName}_FLOW`;
  const CAN_X_FLOW_ALL = `CAN_${permissionName}_FLOW_ALL`;

  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    setFlows(data.flows);
  }, []);

  // useDidMountEffect(() => {
  //   const flowInThisProject = projectPermissions[FLOW_NAME].filter(
  //     (flow) => flow.projectId === project._id
  //   );
  //   if (flowInThisProject.length === flows.length) {
  //     handleAllChange({
  //       target: {
  //         name: FLOW_NAME,
  //         checked: true,
  //         id: project._id,
  //       },
  //     });
  //   }
  // }, [projectPermissions[FLOW_NAME].length]);
  return (
    <>
      {flows.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox
                name={CAN_X_FLOW}
                id={project._id}
                onChange={handleAllChange}
                defaultChecked={projectPermissions[CAN_X_FLOW_ALL]}
                disabled={
                  projectPermissions.EVERYTHING ||
                  projectPermissions[CAN_X_PROJECT_ALL] ||
                  projectPermissions[CAN_X_PROJECT].includes(project._id) ||
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
                  projectPermissions[CAN_X_PROJECT_ALL] ||
                  projectPermissions[CAN_X_FLOW_ALL].includes(project._id) ||
                  projectPermissions[CAN_X_PROJECT].includes(project._id)
                }
              />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {flows.map((flow) => {
            return (
              <CollapsibleMenuItem key={flow._id}>
                <CheckboxGroup label={flow.config.name}>
                  <Checkbox
                    name={CAN_X_FLOW}
                    id={flow._id}
                    onChange={(e) => handleMultiChange(e,flow)}
                    //defaultChecked={projectPermissions[FLOW_NAME].includes(flow._id)}
                    disabled={
                      projectPermissions.EVERYTHING ||
                      projectPermissions[CAN_X_PROJECT_ALL] ||
                      projectPermissions[CAN_X_PROJECT].includes(flow.project._id) ||
                      (permissionName === "VIEW" &&
                        (
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
                      projectPermissions[CAN_X_PROJECT_ALL] ||
                      projectPermissions[CAN_X_PROJECT].includes(project._id) ||
                      projectPermissions[CAN_X_FLOW_ALL].includes(project._id) ||
                      projectPermissions[CAN_X_FLOW].some(f=>f.id === flow._id) ||
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
