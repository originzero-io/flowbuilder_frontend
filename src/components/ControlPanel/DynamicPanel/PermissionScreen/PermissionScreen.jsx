import React, { useState } from "react";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import { MdDevicesOther } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { setCanDoEverytingPermission } from "store/reducers/userPermissionReducer";
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
  initialState
} from "store/reducers/userPermissionReducer";
import { Button, Spinner } from "reactstrap";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import {
  savePermissionService,
  getUserPermissionInThisWorkspaceService,
} from "services/permissionService";
import toast from "react-hot-toast";
import { setModal } from "store/reducers/componentReducer";
import Presets from "./components/Presets";
import useComponentWillMount from "hooks/useComponentWillMount";
export default function PermissionScreen() {
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const params = useParams();
  const users = useUser();
  const member = users.find((user) => user._id === params.member_id);

  const [loading, setLoading] = useState(false);
  const handleEverythingPermission = (e) => {
    dispatch(setCanDoEverytingPermission(e));
  };
  const permissions = useUserPermission();

  useComponentWillMount(async () => {
    try {
      setLoading(true);
      const { permission } = await getUserPermissionInThisWorkspaceService(
        activeWorkspace._id,
        member._id
      );
      console.log("data from server:", permission);
      if (permission) {
        dispatch(loadPermission(permission.permissions));
      }
      else {
        dispatch(loadPermission(initialState));
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }, [activeWorkspace._id, member._id]);

  const handleSavePermissions = async () => {
    const data = {
      userId: member._id,
      workspaceId: activeWorkspace._id,
      permissions,
    };
    try {
      await savePermissionService(data);
      toast.success("Permissions saved");
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };
  const handlePreset = async () => {
    dispatch(setModal(<Presets permissions={permissions} />));
  };
  return (
    <PermissionProvider>
      <div style={{ height: "90vh" }}>
        {loading ? (
          <Spinner color="success" style={{position:'relative',top:'40%',left:'40%'}} />
        ) : (
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
                  <MdDevicesOther style={{ fontSize: "2vmin" }} />
                  <span style={{ marginLeft: "5px" }}>Device</span>
                </Tab>
                <Tab>
                  <AiOutlineFundProjectionScreen
                    style={{ fontSize: "2vmin" }}
                  />
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
                  setSingleAllPermission={setSingleAllPermission}
                  setMultiplePermission={setMultiplePermission}
                  setNestedMultiplePermission={setNestedMultiplePermission}
                  setSinglePermission={setSinglePermission}
                  setNestedAllPermission={setNestedAllPermission}
                />
              </TabPanel>
              <TabPanel style={{ height: "100%" }}>
                <TeamPermissions setSinglePermission={setSinglePermission} />
              </TabPanel>
            </Tabs>
            <Button color="success" onClick={handleSavePermissions}>
              <AiOutlineSave style={{ fontSize: "24px" }} /> Assign this to{" "}
              {member.username}
            </Button>
            <Button
              outline
              style={{ marginLeft: "15px" }}
              onClick={handlePreset}
            >
              <MdOutlineAssignmentInd style={{ fontSize: "24px" }} /> Save as
              preset
            </Button>
          </>
        )}
      </div>
    </PermissionProvider>
  );
}
