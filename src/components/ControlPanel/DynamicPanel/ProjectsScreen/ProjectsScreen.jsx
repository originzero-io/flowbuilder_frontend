/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { CollapsibleMenu, CollapsibleTrigger } from "components/Shared/Collapsible/CollapsibleMenu";
import { setModal } from "store/reducers/componentSlice";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import useProject from "utils/hooks/useProject.js";
import { Alert } from "reactstrap";
import useAuthPermission from "utils/hooks/useAuthPermission";
import * as Styled from "./ProjectsScreen.style";
import AddDashboardForm from "./forms/AddDashboardForm";
import AddFlowForm from "./forms/AddFlowForm";
import FlowList from "./components/FlowList.jsx";
import { TiFlowSwitch } from "react-icons/ti";

const propTypes = {
  flows: PropTypes.array.isRequired,
};
export default function ProjectsScreen({ flows }) {
  const dispatch = useDispatch();
  const { projects, activeProject } = useProject();
  const getPermission = useAuthPermission("project");
  const flowsCollapseTrigger = () => (
    <CollapsibleTrigger label={`Flows (${flows.length})`} style={{ color: "#288818" }} />
  );
  const dashboardCollapseTrigger = () => (
    <CollapsibleTrigger label="Dashboards" style={{ color: "#288818" }} />
  );
  const [searched, setSearched] = useState(flows);
  const searchHandle = (e) => {
    const { value } = e.target;
    const filtered = flows.filter((flow) => flow.name.toLowerCase().includes(value.toLowerCase()));
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(flows);
  }, [flows]);
  return (
    <div style={{ paddingRight: "15px" }}>
      {activeProject ? (
        <>
          <Styled.FlowsContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "24px",
                marginBottom: "12px",
              }}
            >
              <TiFlowSwitch />
              <div style={{ marginLeft: "5px" }}>Flows</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <FlowList flows={searched} />
              {getPermission("CAN_CREATE_FLOW", activeProject._id) && (
                <Styled.Box onClick={() => dispatch(setModal(<AddFlowForm />))}>
                  <VscAdd />
                </Styled.Box>
              )}
            </div>
          </Styled.FlowsContainer>
        </>
      ) : (
        <Alert color="info" style={{ marginLeft: "10px" }}>
          You can start by adding a project to this workspace
        </Alert>
      )}
    </div>
  );
}

ProjectsScreen.propTypes = propTypes;
