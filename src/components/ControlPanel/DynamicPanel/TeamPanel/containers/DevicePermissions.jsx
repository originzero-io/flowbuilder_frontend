import React, { useState, useContext } from "react";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/style";
import Checkbox from "../components/Checkbox";
import CheckboxGroup from "../components/CheckboxGroup";
import CollapsibleMenu, {
  CollapsibleMenuItem,
} from "../components/CollapsibleMenu";
import PermissionContext from "../context/PermissionContext";
import useUserPermission from "../../../../../utils/useUserPermission";
import { useDispatch } from "react-redux";
import {
  setAllPermission,
  setMultiplePermission,
  setSinglePermission,
} from "../../../../../store/reducers/userPermissionReducer";
export default function DevicePermissions() {
  const {
    controllers,
    processors,
  } = useContext(PermissionContext);

  const permissions = useUserPermission("device");
  console.log("device-permissions:", permissions);
  const dispatch = useDispatch();

  ////?
  const handleChange = (e) => {
    dispatch(setSinglePermission(e, "device"));
  };
  const handleMultiChange = (e) => {
    dispatch(setMultiplePermission(e, "device"));
  };
  const handleAllChange = (e, data) => {
    const ids = data.map(d => d._id);
    console.log("ids:", ids);
    dispatch(setAllPermission(e, ids,"device"));
  };
  return (
    <TabContainer>
      <PermissionContainer>
        <PermissionHeader>Create</PermissionHeader>
        <PermissionContent>
          <CheckboxGroup label="Controller">
            <Checkbox
              name="CAN_CREATE_CONTROLLER"
              defaultChecked={permissions.CAN_CREATE_CONTROLLER}
              disabled={permissions.EVERYTHING}
              checked={
                permissions.EVERYTHING || permissions.CAN_CREATE_CONTROLLER
              }
              onChange={(e) => handleChange(e)}
            />
          </CheckboxGroup>
          <CheckboxGroup label="Processor">
            <Checkbox
              name="CAN_CREATE_PROCESSOR"
              defaultChecked={permissions.CAN_CREATE_PROCESSOR}
              onChange={(e) => handleChange(e)}
              disabled={permissions.EVERYTHING}
              checked={
                permissions.EVERYTHING || permissions.CAN_CREATE_PROCESSOR
              }
            />
          </CheckboxGroup>
        </PermissionContent>
      </PermissionContainer>
      {/* ////! */}
      <PermissionContainer>
        <PermissionHeader>Usage</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Controllers">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="CAN_USAGE_CONTROLLER"
                  //onChange={() => handleControllerSelectAll("canUse")}
                  //checked={selectAllControllers.canUse}
                  onChange={(e) => handleAllChange(e,controllers)}
                  defaultChecked={permissions.CAN_USAGE_CONTROLLER_ALL}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING || permissions.CAN_USAGE_CONTROLLER_ALL}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {controllers.map((controller) => {
              return (
                <CollapsibleMenuItem key={controller._id}>
                  <CheckboxGroup label={controller.name}>
                    <Checkbox
                      name="CAN_USAGE_CONTROLLER"
                      id={controller._id}
                      onChange={(e) => handleMultiChange(e)}
                      defaultChecked={permissions.CAN_USAGE_CONTROLLER.includes(
                        controller._id
                      )}
                      disabled={permissions.EVERYTHING}
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_USAGE_CONTROLLER.includes(
                          controller._id
                        )
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
          <CollapsibleMenu trigger="Processors">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="CAN_USAGE_PROCESSOR"
                  onChange={(e) => handleAllChange(e,controllers)}
                  defaultChecked={permissions.CAN_USAGE_PROCESSOR_ALL}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING || permissions.CAN_USAGE_PROCESSOR_ALL}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {processors.map((processor) => {
              return (
                <CollapsibleMenuItem key={processor._id}>
                  <CheckboxGroup label={processor.name}>
                    <Checkbox
                      name="CAN_USAGE_PROCESSOR"
                      id={processor._id}
                      onChange={(e) => handleMultiChange(e)}
                      //checked={processor.canUse}
                      defaultChecked={permissions.CAN_USAGE_PROCESSOR.includes(
                        processor._id
                      )}
                      disabled={permissions.EVERYTHING}
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_USAGE_PROCESSOR.includes(processor._id)
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>

      <PermissionContainer>
        <PermissionHeader>Edit</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Controllers">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="CAN_EDIT_CONTROLLER"
                  onChange={(e) => handleAllChange(e,controllers)}
                  defaultChecked={permissions.CAN_EDIT_CONTROLLER_ALL}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING || permissions.CAN_EDIT_CONTROLLER_ALL}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {controllers.map((controller) => {
              return (
                <CollapsibleMenuItem key={controller._id}>
                  <CheckboxGroup label={controller.name}>
                    <Checkbox
                      name="CAN_EDIT_CONTROLLER"
                      id={controller._id}
                      onChange={(e) => handleMultiChange(e)}
                      //checked={controller.canEdit}
                      defaultChecked={permissions.CAN_EDIT_CONTROLLER.includes(
                        controller._id
                      )}
                      disabled={permissions.EVERYTHING}
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_EDIT_CONTROLLER.includes(controller._id)
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
          <CollapsibleMenu trigger="Processors">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="CAN_EDIT_PROCESSOR"
                  onChange={(e) => handleAllChange(e,controllers)}
                  defaultChecked={permissions.CAN_EDIT_PROCESSOR_ALL}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING || permissions.CAN_EDIT_PROCESSOR_ALL}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {processors.map((processor) => {
              return (
                <CollapsibleMenuItem key={processor._id}>
                  <CheckboxGroup label={processor.name}>
                    <Checkbox
                      name="CAN_EDIT_PROCESSOR"
                      id={processor._id}
                      onChange={(e) => handleMultiChange(e)}
                      //checked={processor.canEdit}
                      defaultChecked={permissions.CAN_EDIT_PROCESSOR.includes(
                        processor._id
                      )}
                      disabled={permissions.EVERYTHING}
                      checked={
                        permissions.EVERYTHING ||
                        permissions.CAN_EDIT_PROCESSOR.includes(processor._id)
                      }
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Delete</PermissionHeader>
        <PermissionContent>
          <CheckboxGroup label="Controller">
            <Checkbox
              name="CAN_DELETE_CONTROLLER"
              defaultChecked={permissions.CAN_DELETE_CONTROLLER}
              onChange={(e) => handleChange(e)}
              disabled={permissions.EVERYTHING}
              checked={
                permissions.EVERYTHING || permissions.CAN_DELETE_CONTROLLER
              }
            />
          </CheckboxGroup>
          <CheckboxGroup label="Processor">
            <Checkbox
              name="CAN_DELETE_PROCESSOR"
              defaultChecked={permissions.CAN_DELETE_PROCESSOR}
              onChange={(e) => handleChange(e)}
              disabled={permissions.EVERYTHING}
              checked={
                permissions.EVERYTHING || permissions.CAN_DELETE_PROCESSOR
              }
            />
          </CheckboxGroup>
        </PermissionContent>
      </PermissionContainer>
    </TabContainer>
  );
}
