import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "../../../Global/Card/Card";
import { getFlowService } from "../../../../services/flowService";
import { setCurrentFlowConfig, setCurrentFlowWorkspace } from "../../../../store/actions/flowActions";
import { setElements } from "../../../../store/actions/elementsActions";
import { loadGroups } from "../../../../store/actions/nodeGroupsActions";

const ElementList = ({ elements }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openPageHandler = async(element) => {
    const { flow } = await getFlowService(element._id);
    dispatch(setCurrentFlowConfig(flow.config));
    dispatch(setCurrentFlowWorkspace(flow.workspace));
    // dispatch(setElements([]));
    // dispatch(loadGroups([]));
    history.push(`/flow/${element._id}`);
  };
  return (
    <>
      {elements && elements.map((element) => {
        return (
          <div key={element._id} onClick={() => openPageHandler(element)}>
            <Card key={element._id} data={element} />
          </div>
        );
      })}
    </>
  );
}
ElementList.propTypes = {
  elements: PropTypes.oneOfType([PropTypes.array, null])
}
export default React.memo(ElementList);