import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, FlowContainer } from "./style";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import AppModal from "../../../global/AppModal";
import AddFlowForm from "./AddFlowForm";
export default function ProjectsPanel() {
  const { activeProject } = useSelector((state) => state.controlPanelReducer);
  const [showModal, setShowModal] = useState(false);

  const addNewFlowHandler = () => {
    
  }
  const showModalHandle = (e) => {
    setShowModal(true);
  };
  const hideModalHandle = (e) => {
    setShowModal(false);
  };
  return (
    <div>
      {activeProject.name}
      <FlowContainer>
      <Box onClick={showModalHandle}>+</Box>
        {activeProject.flows.map((flow) => {
          return (
            <Card key={flow.id} style={{margin:"3px"}}>
              <CardBody>
                <CardTitle tag="h5">{flow.name}</CardTitle>
                <CardText>{flow.description}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </FlowContainer>

      <AppModal
        visible={showModal}
        onOk={hideModalHandle}
        onCancel={hideModalHandle}
      >
        <AddFlowForm closeModal={hideModalHandle} activeProject={activeProject}/>
      </AppModal>
    </div>
  );
}
