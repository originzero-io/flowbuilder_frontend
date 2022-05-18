import React from "react";
import { useDispatch } from "react-redux";
import CreateDevicePermission from "../components/DevicePermissions/CreateDevicePermission";
import DeleteDevicePermission from "../components/DevicePermissions/DeleteDevicePermission";
import EditDevicePermission from "../components/DevicePermissions/EditDevicePermission";
import UsageDevicePermission from "../components/DevicePermissions/UsageDevicePermission";
import { PermissionContainer, TabContainer } from "../components/PermissionScreen.style";
import PropTypes from "prop-types";

const propTypes = {
  permissions: PropTypes.object.isRequired,
  setSinglePermission: PropTypes.func,
  setMultiplePermission: PropTypes.func,
  setSingleAllPermission: PropTypes.func,
  setMultipleAllPermission: PropTypes.func,
};
export default function DevicePermissions({
  permissions,
  setSinglePermission,
  setMultiplePermission,
  setSingleAllPermission,
}) {
  const dispatch = useDispatch();

  const handleSingleDeviceChange = (e) => {
    dispatch(setSinglePermission(e, "device"));
  };
  const handleMultiDeviceChange = (e) => {
    dispatch(setMultiplePermission(e, "device"));
  };
  const handleAllChange = (e) => {
    dispatch(setSingleAllPermission(e, "device"));
  };
  //console.log('device permissions rendered');

  return (
    <TabContainer>
      <PermissionContainer>
        <CreateDevicePermission
          permissions={permissions}
          handleChange={handleSingleDeviceChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <UsageDevicePermission
          permissions={permissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <EditDevicePermission
          permissions={permissions}
          handleChange={handleMultiDeviceChange}
          handleAllChange={handleAllChange}
        />
      </PermissionContainer>
      <PermissionContainer>
        <DeleteDevicePermission
          permissions={permissions}
          handleChange={handleSingleDeviceChange}
        />
      </PermissionContainer>
    </TabContainer>
  );
}

DevicePermissions.propTypes = propTypes;
