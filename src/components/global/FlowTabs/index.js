import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { mergeFlow } from "../../../store/actions/flowActions";
const Container = styled.div`
  display: flex;
  background: transparent;
  position: absolute;
  bottom: 10px;
  left: 15%;
  z-index: 5;
  user-select: none;
`;
const TabItem = styled.div`
  border: 1px solid red;
  width: 80px;
  cursor: pointer;
  color: whitesmoke;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
  text-align: center;
  &:hover {
    background: gray;
  }
`;
export default function FlowTabs() {
  const flows = useSelector((state) => state.flowReducer);
  const dispatch = useDispatch();
  const { flowWorkSpaceReducer, flowConfigReducer, nodeGroupsReducer } = useSelector((state) => state.activeFlowReducer);
  const { reactFlowInstance } = flowWorkSpaceReducer;
  const history = useHistory();
  const onClickHandle = (id) => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    console.log("elements:", elements);
    const flow = {
      config: flowConfigReducer,
      workspace: { ...flowWorkSpaceReducer, position, zoom },
      elements: elements,
      groups: nodeGroupsReducer,
    };
    dispatch(mergeFlow(flow));
    history.push(`/changeTab/${id}`);
  };
  return (
    <Container>
      {flows.map((flow) => {
        return (
          <div key={flow.config.id} onClick={()=>onClickHandle(flow.config.id)}>
              <TabItem key={flow.config.id}>{flow.config.name}</TabItem>
          </div>
        );
      })}
    </Container>
  );
}
