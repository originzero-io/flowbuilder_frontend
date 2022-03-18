import React from "react";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import { MdDevicesOther } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  setCanDoEverytingPermission
} from "../../../../store/reducers/userPermissionReducer";
import useUser from "../../../../utils/useUser";
import useUserPermission from "../../../../utils/useUserPermission";
import useWorkspace from "../../../../utils/useWorkspace";
import Checkbox from "./components/shared/Checkbox";
import CheckboxGroup from "./components/shared/CheckboxGroup";
import { AllPermissionsContainer } from "./components/style";
import UserHeader from "./components/UserHeader";
import DevicePermissions from "./containers/DevicePermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import TeamPermissions from "./containers/TeamPermissions";
import { PermissionProvider } from "./context/PermissionContext";
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
