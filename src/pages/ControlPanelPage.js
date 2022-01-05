import React, { useEffect } from "react";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel";
import PanelRouter from "../components/ControlPanel/DynamicPanel/PanelRouter";
import styled from "styled-components";
import WorkspaceList from "../components/ControlPanel/WorkspacePanel/WorkspaceList.jsx";
import TopMenu from "../components/ControlPanel/DynamicPanel/TopMenu/TopMenu";
import createSocket from "../services/socketApi";
import { useDispatch } from "react-redux";
import { makeMeOnline } from "../store/reducers/authReducer";
import { editUser, getAllUsers } from "../store/reducers/userReducer";
import { openNotification } from "../app-global/dom/notification";
import useAuth from "../utils/useAuth";
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

export let mainNamespace;
export default function ControlPanelPage() {
  const dispatch = useDispatch();
  const auth = useAuth();
  useEffect(() => {
    mainNamespace = createSocket("main");
    console.log("Main", mainNamespace);
    mainNamespace.emit("main:onlineUser", "MAKE_ME_ONLINE");
    mainNamespace.on("main:onlineUser", (data) => {
      if (auth._id !== data._id) {
        dispatch(editUser(data));
        openNotification("", `${data.username} oturum açtı`,"success");
      }
      else dispatch(makeMeOnline(data));
    })
    mainNamespace.on("main:offlineUser", (data) => {
      if (auth._id !== data._id) {
        dispatch(editUser(data));
        openNotification("", `${data.username} oturumu kapadı`,"warning");
      }
      else alert('Oturum başka bir tabde açık')
    })

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
