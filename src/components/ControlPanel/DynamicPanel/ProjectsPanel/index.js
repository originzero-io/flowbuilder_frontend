import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import { Box } from "./style";
import {
  CollapsibleMenu,
  CollapsibleTrigger,
} from "../../../Global/Collapsible/CollapsibleMenu";
import FlowList from "./FlowList.jsx";
import { setModal } from "../../../../store/actions/componentActions";
import AddFlowForm from "./forms/AddFlowForm";
import AddDashboardForm from "./forms/AddDashboardForm";
export default function ProjectsPanel() {
  const dispatch = useDispatch();
  const flowsCollapseTrigger = () => {
    return <CollapsibleTrigger label="Flows"></CollapsibleTrigger>;
  };
  const dashboardCollapseTrigger = () => {
    return <CollapsibleTrigger label="Dashboards"></CollapsibleTrigger>;
  };
  return (
    <>
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <FlowsContainer>
          <Box onClick={() => dispatch(setModal(true,<AddFlowForm/>))}><i className="fas fa-plus"/></Box>
          <FlowList/>
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <Box onClick={() => dispatch(setModal(true,<AddDashboardForm/>))}><i className="fas fa-plus"/></Box>
        </DashboardsContainer>
      </CollapsibleMenu>
    </>
  );
}
