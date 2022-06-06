import React, { useEffect, useState } from "react";
import {
  CollapsibleMenu,
  CollapsibleTrigger,
} from "components/Shared/Collapsible/CollapsibleMenu";
import FlowList from "./components/FlowList.jsx";
import { setModal } from "store/reducers/componentSlice";
import AddFlowForm from "./forms/AddFlowForm";
import AddDashboardForm from "./forms/AddDashboardForm";
import { VscAdd } from "react-icons/vsc";
import {
  SearchBar,
  DashboardsContainer,
  FlowsContainer,
  Box,
} from "./ProjectsScreen.style";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import useProject from "hooks/useProject.js";
import { Alert } from "reactstrap";
import useAuthPermission from "hooks/useAuthPermission";

const propTypes = {
  flows: PropTypes.array.isRequired,
};
export default function Panel({ flows }) {
  const dispatch = useDispatch();
  const { projects, activeProject } = useProject();
  const getPermission = useAuthPermission("project");
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
      {activeProject ? (
        <>
          <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
            {flows.length > 0 && (
              <SearchBar
                placeholder="Search flows"
                spellCheck={false}
                onChange={searchHandle}
              />
            )}
            <FlowsContainer>
              <FlowList flows={searched} />
              {getPermission("CAN_CREATE_FLOW", activeProject._id) && (
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
      ) : (
        <Alert color="info" style={{ marginLeft: "10px" }}>
          You can start by adding a project to this workspace
        </Alert>
      )}
    </>
  );
}

Panel.propTypes = propTypes;
