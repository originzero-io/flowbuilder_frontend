import React, { useState, useEffect,memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import { Box } from "./style";
import {
  CollapsibleMenu,
  CollapsibleTrigger,
} from "../../../Global/Collapsible/CollapsibleMenu";
import ElementList from "./ElementList.jsx";
import { setModal } from "../../../../store/actions/componentActions";
import AddFlowForm from "./forms/AddFlowForm";
import AddDashboardForm from "./forms/AddDashboardForm";
import { VscAdd } from "react-icons/vsc";
import { GrAdd } from "react-icons/gr";
export default function ProjectsPanel() {
  const dispatch = useDispatch();
  const flows = useSelector(state => state.flowReducer);
  const flowsCollapseTrigger = () => {
    return <CollapsibleTrigger label={`Flows (${flows.length})`} style={{ color: 'black' }}/>;
  };
  const dashboardCollapseTrigger = () => {
    return <CollapsibleTrigger label="Dashboards" style={{ color: 'black' }}/>;
  };
  console.log("PROJECT-FLOW PANEL RENDERED");
  return (
    <>
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <FlowsContainer>
          <ElementList elements={flows}/>
          <Box onClick={() => dispatch(setModal(true, <AddFlowForm />))}><VscAdd/></Box>
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <ElementList/>
          <Box onClick={() => dispatch(setModal(true, <AddDashboardForm />))}><VscAdd/></Box>
        </DashboardsContainer>
      </CollapsibleMenu>
    </>
  );
}
