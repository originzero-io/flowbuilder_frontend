import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { assignPermissionToMember } from "../../../../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import useWorkspace from "../../../../utils/useWorkspace";
import { setModal } from "../../../../store/reducers/componentReducer";
import useFlow from "../../../../utils/useFlow";
import DevicePermissions from "./containers/DevicePermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import TeamPermissions from "./containers/TeamPermissions";
import { Button } from "reactstrap";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import CheckboxGroup from "./components/shared/CheckboxGroup";
import Checkbox from "./components/shared/Checkbox";
import UserHeader from "./components/UserHeader";
import { AllPermissionsContainer } from "./components/style";
import { PermissionProvider } from "./context/PermissionContext";
import { useParams } from "react-router-dom";
import useUser from "../../../../utils/useUser";
import { MdDevicesOther } from "react-icons/md";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import {
  setCanDoEverytingPermission,
  setMultiplePermission,
  setSinglePermission,
} from "../../../../store/reducers/userPermissionReducer";
import useUserPermission from "../../../../utils/useUserPermission";
export default function PermissionPage() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);
  console.log("params:", params);
  console.log("member:", member);
  const handleEverythingPermission = (e) => {
    dispatch(setCanDoEverytingPermission(e.target.checked));
  }
  const permissions = useUserPermission();
  console.log("pagedeyim:", permissions);
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        <UserHeader member={member} />
        <AllPermissionsContainer>
          <CheckboxGroup label="This user can do everything" labelSize="1.6vmin">
            <Checkbox
              name="CAN_DO_EVERYTHING"
              onChange={(e) => handleEverythingPermission(e)}
              defaultChecked={permissions.CAN_DO_EVERYTHING}
              //disabled={permissions.EVERYTHING}
              checked={permissions.CAN_DO_EVERYTHING}
            />
          </CheckboxGroup>
        </AllPermissionsContainer>
        <Tabs
          selectedTabClassName="selected-tab"
          style={{ height: "80%" }}
          forceRenderTabPanel={true}
        >
          <TabList
            style={{
              marginBottom: "0px",
              borderBottom: "none"
            }}
          >
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
