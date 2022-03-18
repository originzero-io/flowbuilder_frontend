import React from "react";
import { useDispatch } from "react-redux";
import {
  setAllPermission,
  setMultiplePermission,
  setSinglePermission
} from "../../../../../store/reducers/userPermissionReducer";
import useUserPermission from "../../../../../utils/useUserPermission";
import CreateDevicePermission from "../components/devicePermissions/CreateDevicePermission";
import DeleteDevicePermission from "../components/devicePermissions/DeleteDevicePermission";
import EditDevicePermission from "../components/devicePermissions/EditDevicePermission";
import UsageDevicePermission from "../components/devicePermissions/UsageDevicePermission";
import {
  PermissionContainer, TabContainer
} from "../components/style";
export default function DevicePermissions() {
  const devicePermissions = useUserPermission("device");
  const dispatch = useDispatch();

  const handleSingleDeviceChange = (e) => {
    dispatch(setSinglePermission(e, "device"));
  };
  const handleMultiDeviceChange = (e) => {
    dispatch(setMultiplePermission(e, "device"));
  };
  const handleAllChange = (e, data) => {
    const ids = data.map((d) => d._id);
    console.log("ids:", ids);
    dispatch(setAllPermission(e, ids, "device"));
  };
  return (
    <TabContainer>
      <PermissionContainer>
        <CreateDevicePermission
          permissions={devicePermissions}
          handleChange={handleSingleDeviceChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <UsageDevicePermission
          permissions={devicePermissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditDevicePermission
          permissions={devicePermissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <DeleteDevicePermission
          permissions={devicePermissions}
          handleChange={handleSingleDeviceChange}
        />
      </PermissionContainer>
    </TabContainer>
  );
}
