import React from "react";
import { useDispatch } from "react-redux";
import useUserPermission from "hooks/useUserPermission";
import CreateDevicePermission from "../components/DevicePermissions/CreateDevicePermission";
import DeleteDevicePermission from "../components/DevicePermissions/DeleteDevicePermission";
import EditDevicePermission from "../components/DevicePermissions/EditDevicePermission";
import UsageDevicePermission from "../components/DevicePermissions/UsageDevicePermission";
import { PermissionContainer, TabContainer } from "../components/PermissionScreen.style";
import PropTypes from "prop-types";

const propTypes = {
  setSinglePermission: PropTypes.func,
  setMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setMultipleAllPermission: PropTypes.func,
};
export default function DevicePermissions({
  setSinglePermission,
  setMultiplePermission,
  setSingleAllPermission,
}) {
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
    dispatch(setSingleAllPermission(e, ids, "device"));
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

DevicePermissions.propTypes = propTypes;
