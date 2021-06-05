import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import {
  deleteDashboard,
  deleteFlow,
} from "../../../../store/actions/controlPanelActions";
import { Box } from "../styles";
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
import { Link } from "react-router-dom";
export default function ProjectsPanel() {
  const { activeProject, flows, dashboards } = useSelector(
    (state) => state.controlPanelReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [projectFlows, setProjectFlows] = useState([]);
  const [projectDashboards, setProjectDashboards] = useState([]);
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

  useEffect(() => {
    const flowData = flows.filter(
      (flow) => flow.projectId === activeProject.id
    );
    const dashboardData = dashboards.filter(
      (dashboard) => dashboard.projectId === activeProject.id
    );
    setProjectFlows(flowData);
    setProjectDashboards(dashboardData);
  }, [flows, dashboards, activeProject]);

  const deleteFlowHandler = (flow) => {
    if (confirm("Sure?")) {
      dispatch(deleteFlow(flow));
    }
  };
  const deleteDashbordHandler = (dashbord) => {
    if (confirm("Sure?")) {
      dispatch(deleteDashboard(dashbord));
    }
  };
  return (
    <div>
      {/* {activeProject.name} */}
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <FlowsContainer>
          <Box onClick={() => showModalHandle("flow")}>+</Box>
          {projectFlows.map((flow) => {
            return (
              <Link key={flow.id} to={`/flow/${flow.id}`}>
                <Card key={flow.id}>
                  <CardBody>
                    <CardTitle>{flow.name}</CardTitle>
                    <CardSubtitle>{flow.author}</CardSubtitle>
                    <CardText>{flow.description}</CardText>
                    <CardFooter>
                      <div onClick={() => deleteFlowHandler(flow)}>
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <Box onClick={() => showModalHandle("dashboard")}>+</Box>
          {projectDashboards.map((dashboard) => {
            return (
              <Link key={dashboard.id} to={`/flow/105055`}>
                <Card key={dashboard.id}>
                  <CardBody>
                    <CardTitle>{dashboard.name}</CardTitle>
                    <CardSubtitle>{dashboard.author}</CardSubtitle>
                    <CardText>{dashboard.description}</CardText>
                    <CardFooter>
                      <div onClick={() => deleteDashbordHandler(dashboard)}>
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </DashboardsContainer>
      </CollapsibleMenu>

      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <FormManager closeModal={hideModalHandle} formType={formType} />
      </Modal>
    </div>
  );
}
