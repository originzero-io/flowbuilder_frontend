import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupBarWrapper } from "../../../style-components/AppWrapper";
import GroupBarIcon from "./GroupBarIcon";
import GroupList from "./GroupList";
import NewGroupForm from "./NewGroupForm";
import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  top: 20%;
  //align-items:center;
  max-height:70vh;
  right:${({visible})=>visible === "visible" ? "0px" : "-25px"};
`;
export default function GroupBar() {
  const { flowWorkSpaceReducer } = useSelector((state) => state.activeFlowReducer);
  const { theme,groupBarDisplay } = flowWorkSpaceReducer;
  return (
    <Wrapper visible={groupBarDisplay}>
      <GroupBarIcon theme={theme} />
      <GroupBarWrapper visible={groupBarDisplay} theme={theme}>
        <NewGroupForm theme={theme} />
        <GroupList theme={theme} />
      </GroupBarWrapper>
    </Wrapper>
  );
}
