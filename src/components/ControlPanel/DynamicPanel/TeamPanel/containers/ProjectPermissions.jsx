import React, { useState } from "react";
import Checkbox from "../components/Checkbox";
import {
  PermissionContainer,
  PermissionContent,
  TabContainer,
  PermissionHeader,
} from "../components/style";
import CheckboxGroup from "../components/CheckboxGroup";
import CollapsibleMenu, {
  CollapsibleMenuItem,
  CollapsibleSubMenu,
} from "../components/CollapsibleMenu";
import useProject from "../../../../../utils/useProject";
import FlowList from "../components/FlowList";
import DashboardList from "../components/DashboardList";
import useUserPermission from "../../../../../utils/useUserPermission";
import { useDispatch } from "react-redux";
import {
  setMultiplePermission,
  setSinglePermission,
} from "../../../../../store/reducers/userPermissionReducer";
export default function ProjectPermissions() {
  const dispatch = useDispatch();
  const { projects } = useProject();
  const permissions = useUserPermission("project");
  const handleChange = (e) => {
    console.log("handleChange:", e);
    dispatch(setSinglePermission(e, "project"));
  };
  const handleMultiChange = (e) => {
    console.log("handleMultiChange:", e);
    dispatch(setMultiplePermission(e, "project"));
  };
  return (
    <TabContainer>
      <PermissionContainer size="50%">
        <PermissionHeader>Project Create</PermissionHeader>
        <PermissionContent>
          <Checkbox
            name="CAN_CREATE_PROJECT"
            size="30px"
            center={true}
            defaultChecked={permissions.CAN_CREATE_PROJECT}
            onChange={(e) => handleChange(e)}
          />
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Dashboard Create</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleMenuItem key={project._id}>
                  <CheckboxGroup label={project.name}>
                    <Checkbox
                      name="CAN_CREATE_DASHBOARD"
                      id={project._id}
                      onChange={(e) => handleMultiChange(e)}
                      defaultChecked={permissions.CAN_CREATE_DASHBOARD.includes(
                        project._id
                      )}
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Flow Create</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleMenuItem key={project._id}>
                  <CheckboxGroup label={project.name}>
                    <Checkbox
                      name="CAN_CREATE_FLOW"
                      id={project._id}
                      onChange={(e) => handleMultiChange(e)}
                      defaultChecked={permissions.CAN_CREATE_FLOW.includes(
                        project._id
                      )}
                    />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>

      <PermissionContainer>
        <PermissionHeader>Usage</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name}`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="This project">
                      <Checkbox
                        name="CAN_USAGE_PROJECT"
                        id={project._id}
                        onChange={(e) => handleMultiChange(e)}
                        defaultChecked={permissions.CAN_USAGE_PROJECT.includes(
                          project._id
                        )}
                      />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <FlowList
                      project={project}
                      handleMultiChange={handleMultiChange}
                      permissionName="USAGE"
                    />
                  </CollapsibleSubMenu>
                  <CollapsibleSubMenu trigger="Dashboards">
                    <DashboardList project={project} />
                  </CollapsibleSubMenu>
                </CollapsibleSubMenu>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Edit</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name}`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="This project">
                      <Checkbox
                        name="CAN_EDIT_PROJECT"
                        id={project._id}
                        onChange={(e) => handleMultiChange(e)}
                        defaultChecked={permissions.CAN_EDIT_PROJECT.includes(
                          project._id
                        )}
                      />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <FlowList
                      project={project}
                      handleMultiChange={handleMultiChange}
                      permissionName="EDIT"
                    />
                  </CollapsibleSubMenu>
                  <CollapsibleSubMenu trigger="Dashboards">
                    <DashboardList project={project} />
                  </CollapsibleSubMenu>
                </CollapsibleSubMenu>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>Delete</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name}`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="This project">
                      <Checkbox
                        name="CAN_DELETE_PROJECT"
                        id={project._id}
                        onChange={(e) => handleMultiChange(e)}
                        defaultChecked={permissions.CAN_DELETE_PROJECT.includes(
                          project._id
                        )}
                      />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <FlowList
                      project={project}
                      handleMultiChange={handleMultiChange}
                      permissionName="DELETE"
                    />
                  </CollapsibleSubMenu>
                  <CollapsibleSubMenu trigger="Dashboards">
                    <DashboardList project={project} />
                  </CollapsibleSubMenu>
                </CollapsibleSubMenu>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer>
        <PermissionHeader>View</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name}`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="This project">
                      <Checkbox
                        name="CAN_VIEW_PROJECT"
                        id={project._id}
                        onChange={(e) => handleMultiChange(e)}
                        defaultChecked={permissions.CAN_VIEW_PROJECT.includes(
                          project._id
                        )}
                        disabled={permissions.CAN_EDIT_PROJECT.includes(project._id)}
                        checked={permissions.CAN_VIEW_PROJECT.includes(project._id)}
                      />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <FlowList
                      project={project}
                      handleMultiChange={handleMultiChange}
                      permissionName="VIEW"
                    />
                  </CollapsibleSubMenu>
                  <CollapsibleSubMenu trigger="Dashboards">
                    <DashboardList project={project} />
                  </CollapsibleSubMenu>
                </CollapsibleSubMenu>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
    </TabContainer>
  );
}
