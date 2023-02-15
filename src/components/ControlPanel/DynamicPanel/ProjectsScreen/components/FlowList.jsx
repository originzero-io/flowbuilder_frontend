import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "components/Shared/Card/Card";
import { setCurrentFlowGui } from "store/reducers/flow/flowGuiSlice";
import { setCurrentFlowConfig } from "store/reducers/flow/flowConfigSlice";
import { elementNamespace } from "SocketConnections";
import useAuthPermission from "hooks/useAuthPermission";

import { getFlowsByWorkspace } from "store/reducers/flow/flowSlice";
import useWorkspace from "hooks/useWorkspace";

const propTypes = {
  flows: PropTypes.oneOfType([PropTypes.array, null]),
};

const FlowList = ({ flows }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { activeWorkspace } = useWorkspace();

  const getPermission = useAuthPermission("project");
  const openPageHandler = async (flow) => {
    elementNamespace.emit("elements:getElements", { flow_id: flow._id });
    dispatch(setCurrentFlowConfig(flow.config));
    dispatch(setCurrentFlowGui(flow.gui));
    history.push(`/flow/${flow._id}`);
  };
  useEffect(() => {
    dispatch(getFlowsByWorkspace(activeWorkspace));
  }, []);

  return (
    <>
      {flows &&
        flows.map((flow) => {
          if (
            getPermission("CAN_VIEW_FLOW", {
              flowId: flow._id,
              projectId: flow.project._id,
            })
          ) {
            return (
              <div key={flow._id} onClick={() => openPageHandler(flow)}>
                <Card key={flow._id} data={flow} />
              </div>
            );
          }
          return null;
        })}
    </>
  );
};
FlowList.propTypes = propTypes;

export default React.memo(FlowList);
