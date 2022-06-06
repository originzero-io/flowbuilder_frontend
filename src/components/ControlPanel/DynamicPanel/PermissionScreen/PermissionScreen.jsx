import React, { useState } from "react";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import { MdDevicesOther } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { setCanDoEverytingPermission } from "store/reducers/userPermissionSlice";
import useUser from "hooks/useUser";
import useUserPermission from "hooks/useUserPermission";
import useWorkspace from "hooks/useWorkspace";
import CheckboxGroup from "components/Shared/SwitchInput/CheckboxGroup";
import { AllPermissionsContainer } from "./components/PermissionScreen.style";
import UserHeader from "./components/UserHeader";
import DevicePermissions from "./containers/DevicePermissions";
import ProjectPermissions from "./containers/ProjectPermissions";
import TeamPermissions from "./containers/TeamPermissions";
import { PermissionProvider } from "./context/PermissionContext";
import {
  setSinglePermission,
  setMultiplePermission,
  setNestedMultiplePermission,
  setSingleAllPermission,
  setNestedAllPermission,
  loadPermission,
  getUserPermissionInThisWorkspace,
} from "store/reducers/userPermissionSlice";
import { Button, Input, Spinner } from "reactstrap";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import PermissionService, {
  savePermissionService,
  getUserPermissionInThisWorkspaceService,
} from "services/configurationService/permissionService";
import notification from "utils/notificationHelper";
import { setModal } from "store/reducers/componentSlice";
import AddPreset from "./components/AddPreset";
import useComponentWillMount from "hooks/useComponentWillMount";
import PresetList from "./components/PresetList";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import useAuth from "hooks/useAuth";

export default function PermissionScreen() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const auth = useAuth();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);

  const handleEverythingPermission = (e) => {
    dispatch(setCanDoEverytingPermission(e));
  };
  const permissions = useUserPermission();

  useComponentWillMount(async () => {
    dispatch(getUserPermissionInThisWorkspace(activeWorkspace, member));
  }, [activeWorkspace._id, member._id]);

  const handleSavePermissions = async () => {
    const data = {
      userId: member._id,
      workspaceId: activeWorkspace._id,
      permissions,
    };
    await PermissionService.savePermission(data);
    
    if (data.userId === auth._id) {
      dispatch(getMyPermissionInThisWorkspace({workspace: activeWorkspace,me: auth}));
    }
    notification.success("Permissions saved");

  };
  const handleSavePreset = () => {
    dispatch(setModal(<AddPreset permissions={permissions} />));
  };
  const handleLoadPreset = () => {
    dispatch(setModal(<PresetList />));
  };
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        <>
          <UserHeader member={member} />
          <AllPermissionsContainer>
            <CheckboxGroup
              label="This user can do everything"
              labelSize="1.6vmin"
              name="CAN_DO_EVERYTHING"
              onChange={(e) => handleEverythingPermission(e)}
              defaultChecked={permissions.CAN_DO_EVERYTHING}
              checked={permissions.CAN_DO_EVERYTHING}
            />
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
                <AiOutlineFundProjectionScreen style={{ fontSize: "2vmin" }} />
                <span style={{ marginLeft: "5px" }}>Project</span>
              </Tab>
              <Tab>
                <AiOutlineTeam style={{ fontSize: "2vmin" }} />
                <span style={{ marginLeft: "5px" }}>Team</span>
              </Tab>
              <Tab>
                <MdDevicesOther style={{ fontSize: "2vmin" }} />
                <span style={{ marginLeft: "5px" }}>Device</span>
              </Tab>
            </TabList>
            <TabPanel style={{ height: "100%" }}>
              <ProjectPermissions
                permissions={{...permissions.project,EVERYTHING:permissions["CAN_DO_EVERYTHING"]}}
                setSingleAllPermission={setSingleAllPermission}
                setMultiplePermission={setMultiplePermission}
                setNestedMultiplePermission={setNestedMultiplePermission}
                setSinglePermission={setSinglePermission}
                setNestedAllPermission={setNestedAllPermission}
              />
            </TabPanel>
            <TabPanel style={{ height: "100%" }}>
              <TeamPermissions
                permissions={{...permissions.team,EVERYTHING:permissions["CAN_DO_EVERYTHING"]}}
                setSinglePermission={setSinglePermission}
              />
            </TabPanel>
            <TabPanel style={{ height: "100%" }}>
              <DevicePermissions
                permissions={{...permissions.device,EVERYTHING:permissions["CAN_DO_EVERYTHING"]}}
                setSinglePermission={setSinglePermission}
                setMultiplePermission={setMultiplePermission}
                setSingleAllPermission={setSingleAllPermission}
              />
            </TabPanel>
          </Tabs>
          <Button color="success" onClick={handleSavePermissions}>
            <AiOutlineSave style={{ fontSize: "24px" }} /> Assign this to{" "}
            {member.username}
          </Button>
          <Button
            outline
            style={{ marginLeft: "15px" }}
            onClick={handleSavePreset}
          >
            <MdOutlineAssignmentInd style={{ fontSize: "24px" }} /> Save as
            preset
          </Button>
          <Button
            outline
            color="warning"
            style={{ marginLeft: "15px" }}
            onClick={handleLoadPreset}
          >
            <MdOutlineAssignmentInd style={{ fontSize: "24px" }} /> Load Preset
          </Button>
        </>
      </div>
    </PermissionProvider>
  );
}
