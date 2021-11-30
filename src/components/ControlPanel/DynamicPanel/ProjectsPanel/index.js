import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import { Box } from "./style";
import {
  CollapsibleMenu,
  CollapsibleTrigger,
} from "../../../global/Collapsible/CollapsibleMenu";
import FlowList from "./FlowList.jsx";
import { setModal } from "../../../../store/reducers/componentReducer";
import AddFlowForm from "./forms/AddFlowForm";
import AddDashboardForm from "./forms/AddDashboardForm";
import { VscAdd } from "react-icons/vsc";
import { DynamicPanelContainer } from "../style";
export default function ProjectsPanel() {
  const dispatch = useDispatch();
  const flows = useSelector((state) => state.flows);
  const flowsCollapseTrigger = () => {
    return (
      <CollapsibleTrigger
        label={`Flows (${flows.length})`}
        style={{ color: "white" }}
      />
    );
  };
  const dashboardCollapseTrigger = () => {
    return <CollapsibleTrigger label="Dashboards" style={{ color: "white" }} />;
  };
  //console.log("PROJECT-FLOW PANEL RENDERED");
  return (
    <DynamicPanelContainer>
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <FlowsContainer>
          <FlowList flows={flows} />
          <Box onClick={() => dispatch(setModal(<AddFlowForm />))}>
            <VscAdd />
          </Box>
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          {/* <ElementList/> */}
          <Box onClick={() => dispatch(setModal(<AddDashboardForm />))}>
            <VscAdd />
          </Box>
        </DashboardsContainer>
      </CollapsibleMenu>
    </DynamicPanelContainer>
  );
}
