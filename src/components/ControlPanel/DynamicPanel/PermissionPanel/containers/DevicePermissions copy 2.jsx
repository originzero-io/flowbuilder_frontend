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
  return (
    <TabContainer>
      <PermissionContainer>
        <PermissionHeader>Create</PermissionHeader>
        <PermissionContent>
          <CheckboxGroup label="Controller">
            <Checkbox name="controllerCreate" />
          </CheckboxGroup>
          <CheckboxGroup label="Processor">
            <Checkbox name="processorCreate" />
          </CheckboxGroup>
        </PermissionContent>
      </PermissionContainer>

      <PermissionContainer>
        <PermissionHeader>Usage</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Controllers">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="ALL_CONTROLLER"
                  onChange={() => handleControllerSelectAll("canUse")}
                  checked={selectAllControllers.canUse}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {controllers.map((controller) => {
              return (
                <CollapsibleMenuItem key={controller._id}>
                  <CheckboxGroup label={controller.name}>
                    <Checkbox
                      name={controller.name}
                      id={controller._id}
                      onChange={(event) =>
                        handleControllerChange(event, "canUse")
                      }
                      checked={controller.canUse}
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
                  checked={selectAllProcessors.canUse}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {processors.map((processor) => {
              return (
                <CollapsibleMenuItem key={processor._id}>
                  <CheckboxGroup label={processor.name}>
                    <Checkbox
                      name={processor.name}
                      id={processor._id}
                      onChange={(event) =>
                        handleProcessorChange(event, "canUse")
                      }
                      checked={processor.canUse}
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
                  checked={selectAllControllers.canEdit}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {controllers.map((controller) => {
              return (
                <CollapsibleMenuItem key={controller._id}>
                  <CheckboxGroup label={controller.name}>
                    <Checkbox
                      name={controller.name}
                      id={controller._id}
                      onChange={(event) =>
                        handleControllerChange(event, "canEdit")
                      }
                      checked={controller.canEdit}
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
                  checked={selectAllProcessors.canEdit}
                />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {processors.map((processor) => {
              return (
                <CollapsibleMenuItem key={processor._id}>
                  <CheckboxGroup label={processor.name}>
                    <Checkbox
                      name={processor.name}
                      id={processor._id}
                      onChange={(event) =>
                        handleProcessorChange(event, "canEdit")
                      }
                      checked={processor.canEdit}
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
            <Checkbox name="controllerCreate" />
          </CheckboxGroup>
          <CheckboxGroup label="Processor">
            <Checkbox name="processorCreate" />
          </CheckboxGroup>
        </PermissionContent>
      </PermissionContainer>
    </TabContainer>
  );
}
