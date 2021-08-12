import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import {
  deleteDashboard,
} from "../../../../store/actions/controlPanelActions";
import {
  deleteFlow, openFlow,
} from "../../../../store/actions/flowActions";
import { Box } from "./style";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from "../../../global/Card/Card";
import Modal from "../../../global/Modal";
import {
  CollapsibleMenu,
  CollapsibleTrigger,
} from "../../../global/Collapsible/CollapsibleMenu";
import FormManager from "./forms/FormManager";
import FlowList from "./FlowList.jsx";
export default function ProjectsPanel() {
  const { activeTeam } = useSelector(
    (state) => state.teamReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(null);

  const dispatch = useDispatch();
  const showModalHandle = (type) => {
    setShowModal(true);
    setFormType(type);
  };
  const hideModalHandle = () => {
    setShowModal(false);
  };

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
          <Box onClick={() => showModalHandle("flow")}><i className="fas fa-plus"/></Box>
          <FlowList/>
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <Box onClick={() => showModalHandle("dashboard")}><i className="fas fa-plus"/></Box>
        </DashboardsContainer>
      </CollapsibleMenu>

      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <FormManager closeModal={hideModalHandle} formType={formType} />
      </Modal>
    </>
  );
}
