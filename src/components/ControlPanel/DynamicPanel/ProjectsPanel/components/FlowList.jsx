import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../../global/Card/Card";
import { setCurrentFlowGui } from "../../../../../store/reducers/flow/flowGuiReducer";
import { setCurrentFlowConfig } from "../../../../../store/reducers/flow/flowConfigReducer";
import { getElementsByFlow } from "../../../../../store/reducers/flow/flowElementsReducer";
import { elementNamespace } from "../../../../global/SocketConnections";
import { beginTheBar } from "../../../../../store/reducers/componentReducer";

const FlowList = ({ flows }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPageHandler = async(flow) => {
    //dispatch(getElementsByFlow(flow));
    dispatch(beginTheBar());
    elementNamespace.emit('elements:getElements',{flow_id:flow._id});
    dispatch(setCurrentFlowConfig(flow.config));
    dispatch(setCurrentFlowGui(flow.gui));
    history.push(`/flow/${flow._id}`);
  };
  return (
    <>
      {flows && flows.map((flow) => {
        return (
          <div key={flow._id} onClick={() => openPageHandler(flow)}>
            <Card key={flow._id} data={flow} />
          </div>
        );
      })}
    </>
  );
}
FlowList.propTypes = {
  flows: PropTypes.oneOfType([PropTypes.array, null])
}
export default React.memo(FlowList);