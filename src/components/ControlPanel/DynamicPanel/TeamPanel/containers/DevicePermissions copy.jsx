import React, { useState } from "react";
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
export default function DevicePermissions() {
  const [controllers, setControllers] = useState([
    {
      _id: "1",
      name: "Controller 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Controller 2",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "3",
      name: "Controller 3",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "4",
      name: "Controller 4",
      canUse: false,
      canEdit: false,
    },
  ]);
  const [processors, setProcessors] = useState([
    {
      _id: "1",
      name: "Processor 1",
      canUse: false,
      canEdit: false,
    },
    {
      _id: "2",
      name: "Processor 2",
      canUse: false,
      canEdit: false,
    },
  ]);
  const [selectAllControllers, setSelectAllControllers] = useState(false);
  const [selectAllProcessors, setSelectAllProcessors] = useState(false);
  const handleControllerChange = (event, permission) => {
    const newControllers = [...controllers];
    const controllerToUpdate = newControllers.find(
      (controller) => controller._id === event.target.id
    );
    controllerToUpdate[permission] = !controllerToUpdate[permission];
    if (!controllerToUpdate[permission] && selectAllControllers) {
      handleControllerSelectAll();
    }
    setControllers(newControllers);
    const checkedAll = allInputsChecked(newControllers, permission);
    if (checkedAll && !selectAllControllers) {
      handleControllerSelectAll();
    }
  };
  const handleControllerSelectAll = (permission) => {
    setSelectAllControllers((prevState) => !prevState);
    const newControllers = controllers.map((controller) => {
      return { ...controller, [permission]: !selectAllControllers };
    });
    setControllers(newControllers);
  };
  const handleProcessorChange = (event, permission) => {
    const newProcessors = [...processors];
    const processorToUpdate = newProcessors.find(
      (processor) => processor._id === event.target.id
    );
    processorToUpdate[permission] = !processorToUpdate[permission];
    if (!processorToUpdate[permission] && selectAllProcessors) {
      handleProcessorSelectAll();
    }
    setProcessors(newProcessors);
    const checkedAll = allInputsChecked(newProcessors, permission);
    if (checkedAll && !selectAllProcessors) {
      handleProcessorSelectAll();
    }
  };
  const handleProcessorSelectAll = (permission) => {
    setSelectAllProcessors((prevState) => !prevState);
    const newProcessors = processors.map((processor) => {
      return { ...processor, [permission]: !selectAllProcessors };
    });
    setProcessors(newProcessors);
  };
  const allInputsChecked = (array, permission) => {
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      flag = flag && array[i][permission];
    }
    return flag;
  };
  return (
    <TabContainer>
      <PermissionContainer size="10%">
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

      <PermissionContainer size="40%">
        <PermissionHeader>Usage</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Controllers >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="ALL_CONTROLLER"
                  onChange={() => handleControllerSelectAll("canUse")}
                  checked={selectAllControllers}
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
          <CollapsibleMenu trigger="Processors >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="ALL_PROCESSOR"
                  onChange={() => handleProcessorSelectAll("canUse")}
                  checked={selectAllProcessors}
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

      <PermissionContainer size="40%">
        <PermissionHeader>Edit</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Controllers >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="ALL_CONTROLLER_2"
                  onChange={() => handleControllerSelectAll("canEdit")}
                  checked={selectAllControllers}
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
          <CollapsibleMenu trigger="Processors >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox
                  name="ALL_PROCESSOR"
                  onChange={() => handleProcessorSelectAll("canEdit")}
                  checked={selectAllProcessors}
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
      <PermissionContainer size="10%">
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
