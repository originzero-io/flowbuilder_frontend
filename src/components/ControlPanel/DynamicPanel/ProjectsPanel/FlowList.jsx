import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../Global/Card/Card";
import { setCurrentFlowConfig, setCurrentFlowGui } from "../../../../store/actions/flowActions";
import { getElementsByFlow } from "../../../../store/actions/elementActions";

const FlowList = ({ flows }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPageHandler = async(flow) => {
    dispatch(getElementsByFlow(flow));
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