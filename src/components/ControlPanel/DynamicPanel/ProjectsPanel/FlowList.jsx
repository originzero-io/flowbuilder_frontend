import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../global/Card/Card";
import { setCurrentFlowGui } from "../../../../store/reducers/flow/flowGuiReducer";
import { setCurrentFlowConfig } from "../../../../store/reducers/flow/flowConfigReducer";
import { getElementsByFlow } from "../../../../store/reducers/flow/flowElementsReducer";
import { elementNamespace } from "../../../../App";

const FlowList = ({ flows }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPageHandler = async(flow) => {
    //dispatch(getElementsByFlow(flow));
    elementNamespace.emit('elements:getElements',{flow_id:flow._id});
    //mainNamespace.emit('main:messageFromClient',"Hello main. I am FlowList component");
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