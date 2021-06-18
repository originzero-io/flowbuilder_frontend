import React,{ useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { closeFlow, mergeFlow } from "../../../store/actions/flowActions";
import AddFlowForm from "../../ControlPanel/SidePanel/Projects/forms/AddFlowForm";
import Modal from "../../global/Modal";
import * as themeColor from "../../../config/ThemeReference"
import { CancelIcon } from "../../global/icons";
const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 1px;
  left: 15%;
  z-index: 5;
  user-select: none;
`;
const TabItem = styled.button`
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  border:none;
  min-width: 120px;
  cursor: pointer;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
  text-align: center;
  background: ${({ selected }) => selected ? themeColor.HOVER_COLOR : "rgba(189, 195, 199,0.6)" };
  position:relative;
  &:hover {
    transform: scale(1.1);
    background: ${themeColor.HOVER_COLOR};  
  }
`;
const AddButton = styled.div`
  background:rgba(189, 195, 199,0.6);
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  min-width: 20px;
  font-size:18px;
  cursor: pointer;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
  text-align: center;
  &:hover {
    transform: scale(1.1);
    background: ${themeColor.HOVER_COLOR};
  }
`;
const CloseButton = styled.div`
  position:absolute;
  top:0px;
  right:0;
`;
export default function FlowTabs() {
  const flows = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [openedFlows, setOpenedFlows] = useState([]);

  const { flowWorkSpaceReducer, flowConfigReducer, nodeGroupsReducer } = useSelector((state) => state.activeFlowReducer);
  const { reactFlowInstance } = flowWorkSpaceReducer;
  
  const history = useHistory();
  const showModalHandle = () => {
    setShowModal(true);
  };
  const hideModalHandle = () => {
    setShowModal(false);
  };
  const onClickHandle = (id) => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfigReducer,
      workspace: { ...flowWorkSpaceReducer, position, zoom },
      elements: elements,
      groups: nodeGroupsReducer,
    };
    dispatch(mergeFlow(flow));
    history.push(`/change-tab/${id}`);
  };
  useEffect(() => {
    const opened = flows.filter(flow => flow.opened === true);
    setOpenedFlows(opened);
  }, [flows])
  const closeFlowHandle = (event, flow) => {
    event.stopPropagation();
    dispatch(closeFlow(flow.config));
    if (flowConfigReducer.id === flow.config.id) {
      const { position, zoom, elements } = reactFlowInstance.toObject();
      const flowx = {
        config: flowConfigReducer,
        workspace: { ...flowWorkSpaceReducer, position, zoom },
        elements: elements,
        groups: nodeGroupsReducer,
      };
      dispatch(mergeFlow(flowx));
      history.push("/");
    }
  }
  return (
    <Container>
      {openedFlows.map((flow) => {
        return (
          <div key={flow.config.id} onClick={() => onClickHandle(flow.config.id)}>
            <TabItem
              disabled={flowConfigReducer.id === flow.config.id}
              selected={flowConfigReducer.id === flow.config.id}
              key={flow.config.id}>
              <div>
                {flow.config.name}
              </div>
              <CloseButton onClick={(event)=>closeFlowHandle(event,flow)}>
                <CancelIcon width="20px" height="20px"/>
              </CloseButton>
            </TabItem>
          </div>
        );
      })}
      <AddButton onClick={showModalHandle}>+</AddButton>
      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <AddFlowForm closeModal={hideModalHandle}/>
      </Modal>
    </Container>
  );
}
