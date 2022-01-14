import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { assignPermissionToMember } from "../../../../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import useWorkspace from "../../../../utils/useWorkspace";
import { setModal } from "../../../../store/reducers/componentReducer";
import { openNotification } from "../../../../app-global/dom/notification";
import useFlow from "../../../../utils/useFlow";
import DevicePermissions from "./containers/DevicePermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import TeamPermissions from "./containers/TeamPermissions";
import { Button } from "reactstrap";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import CheckboxGroup from "./components/CheckboxGroup";
import Checkbox from "./components/Checkbox";
import UserHeader from "./components/UserHeader";
import { AllPermissionsContainer } from "./components/style";
import { PermissionProvider } from "./context/PermissionContext";
import { useParams } from "react-router-dom";
import useUser from "../../../../utils/useUser";
import { MdDevicesOther } from "react-icons/md";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
export default function PermissionPage() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);
  console.log("params:", params);
  console.log("member:", member);
  const memberPermissionsThisWorkspace = member.workspaces.find(
    (workspace) => workspace._id === activeWorkspace._id
  )?.permissions;
  const [permissions, setPermissions] = useState({
    CAN_CREATE_PROJECT: false,
    CAN_EDIT_PROJECT: false,
    CAN_DELETE_PROJECT: false,
    CAN_CREATE_FLOW: false,
    CAN_EDIT_FLOW: false,
    CAN_DELETE_FLOW: false,
    CAN_CREATE_DEVICE: false,
    CAN_EDIT_DEVICE: false,
    CAN_DELETE_DEVICE: false,
    CAN_CREATE_USER: false,
    CAN_EDIT_USER: false,
    CAN_DELETE_USER: false,
  });
  useEffect(() => {
    setPermissions({ ...permissions, ...memberPermissionsThisWorkspace });
  }, []);
  const onChangeHandle = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        <UserHeader member={member} />
        <AllPermissionsContainer>
          <CheckboxGroup label="This user can do everything" labelSize="15px">
            <Checkbox name="processorCreate" size="20px" />
          </CheckboxGroup>
        </AllPermissionsContainer>
        <Tabs
          selectedTabClassName="selected-tab"
          style={{ height: "80%" }}
          forceRenderTabPanel={true}
        >
          <TabList style={{ marginBottom: "0px", borderBottom: "none" }}>
            <Tab>
              <MdDevicesOther style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Device</span>
            </Tab>
            <Tab>
              <AiOutlineFundProjectionScreen style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Project</span>
            </Tab>
            <Tab>
              <AiOutlineTeam style={{ fontSize: "2vmin" }} />
              <span style={{ marginLeft: "5px" }}>Team</span>
            </Tab>
          </TabList>
          <TabPanel style={{ height: "100%" }}>
            <DevicePermissions />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <ProjectPermissions />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <TeamPermissions />
          </TabPanel>
        </Tabs>
      </div>
    </PermissionProvider>
  );
}
