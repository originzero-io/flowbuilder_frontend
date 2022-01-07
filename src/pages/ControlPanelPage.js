import React, { useEffect } from "react";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel";
import PanelRouter from "../components/ControlPanel/DynamicPanel/PanelRouter";
import styled from "styled-components";
import WorkspaceList from "../components/ControlPanel/WorkspacePanel/WorkspaceList.jsx";
import TopMenu from "../components/ControlPanel/DynamicPanel/TopMenu/TopMenu";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../store/reducers/userReducer";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  height: 100vh;
`;

export default function ControlPanelPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [])
  return (
    <Wrapper>
      <TopMenu />
      <Content>
        <WorkspaceList />
        <NavigationPanel />
        <PanelRouter />
      </Content>
    </Wrapper>
  );
}
