import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { SearchBar } from "./style";
import useFlow from "../../../../utils/useFlow";
import usePermission from "../../../../utils/usePermission";
export default function ProjectsPanel() {
  const dispatch = useDispatch();
  const permission = usePermission();
  //console.log("PERMISSION:", permission);
  //console.log("PROJECT PANEL RENDERED");
  const flows = useFlow();
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
  const [searched, setSearched] = useState(flows);
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = flows.filter((flow) =>
      flow.config.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(flows);
  }, [flows]);
  return (
    <>
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <SearchBar
          placeholder="Search flows"
          spellCheck={false}
          onChange={searchHandle}
        />
        <FlowsContainer>
          <FlowList flows={searched} />
          {permission?.CAN_CREATE_FLOW && (
            <Box onClick={() => dispatch(setModal(<AddFlowForm />))}>
              <VscAdd />
            </Box>
          )}
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <Box onClick={() => dispatch(setModal(<AddDashboardForm />))}>
            <VscAdd />
          </Box>
        </DashboardsContainer>
      </CollapsibleMenu>
    </>
  );
}
