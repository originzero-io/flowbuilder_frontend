import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardsContainer, FlowsContainer } from "./style";
import {
  deleteDashboard,
} from "../../../../store/actions/controlPanelActions";
import {
  deleteFlow, openFlow,
} from "../../../../store/actions/flowActions";
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
import { useHistory } from "react-router-dom";
export default function ProjectsPanel() {
  const { activeProject, dashboards } = useSelector(
    (state) => state.controlPanelReducer
  );
  const flows = useSelector((state) => state.flowReducer);
  const [showModal, setShowModal] = useState(false);
  const [projectFlows, setProjectFlows] = useState([]);
  const [projectDashboards, setProjectDashboards] = useState([]);
  const [formType, setFormType] = useState(null);
  const history = useHistory();
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
      (flow) => flow.config.projectId === activeProject.id
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

  const openPageHandler = (type, data) => {
    dispatch(openFlow(data));
    history.push(`/${type}/${data.id}`);
  }
  return (
    <>
      {/* {activeProject.name} */}
      <CollapsibleMenu trigger={flowsCollapseTrigger()} open={true}>
        <FlowsContainer>
          <Box onClick={() => showModalHandle("flow")}>+</Box>
          {projectFlows.map(({config}) => {
            return (
              <div key={config.id} onClick={()=>openPageHandler("flow",config)}>
                <Card key={config.id}>
                  <CardBody>
                    <CardTitle>{config.name}</CardTitle>
                    <CardSubtitle>{config.author}</CardSubtitle>
                    <CardText>{config.description}</CardText>
                    <CardFooter>
                      <div onClick={() => deleteFlowHandler(config)}>
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </CardFooter>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </FlowsContainer>
      </CollapsibleMenu>
      <CollapsibleMenu trigger={dashboardCollapseTrigger()} open={true}>
        <DashboardsContainer>
          <Box onClick={() => showModalHandle("dashboard")}>+</Box>
          {projectDashboards.map((dashboard) => {
            return (
              <div key={dashboard.id} onClick={()=>openPageHandler("dashboard",dashboard)}>
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
              </div>
            );
          })}
        </DashboardsContainer>
      </CollapsibleMenu>

      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <FormManager closeModal={hideModalHandle} formType={formType} />
      </Modal>
    </>
  );
}
