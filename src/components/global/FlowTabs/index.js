import React,{ useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeFlow, mergeFlow } from "../../../store/actions/flowActions";
import { Container, TabItem, AddButton,CloseButton } from "./style";
const FlowTabs = () => {
  const flows = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const [openedFlows, setOpenedFlows] = useState([]);
  const { flowWorkSpaceReducer, flowConfigReducer, nodeGroupsReducer } = useSelector((state) => state.activeFlowReducer);
  const { reactFlowInstance } = flowWorkSpaceReducer;
  
  const history = useHistory();
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
              <div style={{paddingRight:'20px'}}>
                {flow.config.name}
              </div>
            </TabItem>
          </div>
        );
      })}
    </Container>
  );
}
export default React.memo(FlowTabs);