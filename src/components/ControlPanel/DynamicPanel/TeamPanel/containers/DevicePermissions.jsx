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
    setControllers,
    processors,
    setProcessors,
    selectAllControllers,
    setSelectAllControllers,
    selectAllProcessors,
    setSelectAllProcessors,
  } = useContext(PermissionContext);

  const permissions = useUserPermission("device");
  console.log("device-permissions:", permissions);
  const dispatch = useDispatch();
  const handleControllerChange = (event, permission) => {
    const newControllers = [...controllers];
    const controllerToUpdate = newControllers.find(
      (controller) => controller._id === event.target.id
    );
    controllerToUpdate[permission] = !controllerToUpdate[permission];
    if (!controllerToUpdate[permission] && selectAllControllers[permission]) {
      handleControllerSelectAll(permission);
    }
    setControllers(newControllers);
    const checkedAll = allInputsChecked(newControllers, permission);
    if (checkedAll && !selectAllControllers[permission]) {
      handleControllerSelectAll(permission);
    }
  };
  const handleProcessorChange = (event, permission) => {
    const newProcessors = [...processors];
    const processorToUpdate = newProcessors.find(
      (processor) => processor._id === event.target.id
    );
    processorToUpdate[permission] = !processorToUpdate[permission];
    if (!processorToUpdate[permission] && selectAllProcessors[permission]) {
      handleProcessorSelectAll(permission);
    }
    setProcessors(newProcessors);
    const checkedAll = allInputsChecked(newProcessors, permission);
    if (checkedAll && !selectAllProcessors[permission]) {
      handleProcessorSelectAll(permission);
    }
  };
  const handleControllerSelectAll = (permission) => {
    setSelectAllControllers({
      ...selectAllControllers,
      [permission]: !selectAllControllers[permission],
    });
    const newControllers = controllers.map((controller) => {
      return { ...controller, [permission]: !selectAllControllers[permission] };
    });
    setControllers(newControllers);
  };
  const handleProcessorSelectAll = (permission) => {
    setSelectAllProcessors({
      ...selectAllProcessors,
      [permission]: !selectAllProcessors[permission],
    });
    const newProcessors = processors.map((processor) => {
      return { ...processor, [permission]: !selectAllProcessors[permission] };
    });
    setProcessors(newProcessors);
  };
  const allInputsChecked = (array, permission) => {
    const allIsChecked = array.every((element) => element[permission] === true);
    return allIsChecked;
  };

  ////?
  const handleChange = (e) => {
    dispatch(setSinglePermission(e, "device"));
  };
  const handleMultiChange = (e) => {
    dispatch(setMultiplePermission(e, "device"));
  };
  const handleAllChange = (e, data) => {
    dispatch(setAllPermission(e, data));
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
                  name="CAN_USAGE_ALL_CONTROLLER"
                  //onChange={() => handleControllerSelectAll("canUse")}
                  //checked={selectAllControllers.canUse}
                  onChange={(e) => handleChange(e)}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING}
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
                  name="ALL_PROCESSOR"
                  onChange={() => handleProcessorSelectAll("canUse")}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING}
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
                  name="ALL_CONTROLLER_2"
                  onChange={() => handleControllerSelectAll("canEdit")}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING}
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
                  name="ALL_PROCESSOR"
                  onChange={() => handleProcessorSelectAll("canEdit")}
                  disabled={permissions.EVERYTHING}
                  checked={permissions.EVERYTHING}
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
