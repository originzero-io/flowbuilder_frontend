import React from "react";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import { MdDevicesOther } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { setCanDoEverytingPermission } from "store/reducers/userPermissionReducer";
import useUser from "hooks/useUser";
import useUserPermission from "hooks/useUserPermission";
import useWorkspace from "hooks/useWorkspace";
import Checkbox from "components/Shared/SwitchInput/Checkbox";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import { AllPermissionsContainer } from "./components/PermissionScreen.style";
import UserHeader from "./components/UserHeader";
import DevicePermissions from "./containers/DevicePermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import TeamPermissions from "./containers/TeamPermissions";
import { PermissionProvider } from "./context/PermissionContext";
import {
  setSingleAllPermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSinglePermission,
  setMultipleAllPermission,
} from "store/reducers/userPermissionReducer";
import { Button } from "reactstrap";
import { AiOutlineSave } from "react-icons/ai";
import { assignPermissionToMemberService } from "services/userService";
import toast from "react-hot-toast";
export default function PermissionScreen() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);
  const handleEverythingPermission = (e) => {
    dispatch(setCanDoEverytingPermission(e.target.checked));
  };
  const permissions = useUserPermission();

  const handleSavePermissions = async () => {
    console.log(permissions);
    await assignPermissionToMemberService(member, activeWorkspace, permissions);
    toast.success('Permissions saved')
  }
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        <UserHeader member={member} />
        <AllPermissionsContainer>
          <CheckboxGroup
            label="This user can do everything"
            labelSize="1.6vmin"
          >
            <Checkbox
              name="CAN_DO_EVERYTHING"
              onChange={(e) => handleEverythingPermission(e)}
              defaultChecked={permissions.CAN_DO_EVERYTHING}
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
              borderBottom: "none",
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
            <DevicePermissions
              setSinglePermission={setSinglePermission}
              setMultiplePermission={setMultiplePermission}
              setSingleAllPermission={setSingleAllPermission}
            />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <ProjectPermissions
              setSinglePermission={setSinglePermission}
              setMultiplePermission={setMultiplePermission}
              setNestedMultiplePermission={setNestedMultiplePermission}
              setSingleAllPermission={setSingleAllPermission}
              setMultipleAllPermission={setMultipleAllPermission}
            />
          </TabPanel>
          <TabPanel style={{ height: "100%" }}>
            <TeamPermissions setSinglePermission={setSinglePermission} />
          </TabPanel>
        </Tabs>
        <Button color="success" onClick={handleSavePermissions}><AiOutlineSave style={{ fontSize: '24px' }}/> Save</Button>
      </div>
    </PermissionProvider>
  );
}
