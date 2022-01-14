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
export default function ProjectPermissions() {
  const { projects } = useProject();
  return (
    <TabContainer>
      <PermissionContainer>
        <PermissionHeader>Project Create</PermissionHeader>
        <PermissionContent>
          <Checkbox name="all" size="30px" center={true} />
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
                    <Checkbox name="processorCreate" />
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
                <Checkbox name="processorCreate"/>
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleMenuItem key={project._id}>
                  <CheckboxGroup label={project.name}>
                    <Checkbox name="processorCreate" />
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
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" />
                      </CheckboxGroup>
                    </CollapsibleMenuItem>
                    <FlowList project={project} as={CollapsibleMenuItem} />
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
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" />
                      </CheckboxGroup>
                    </CollapsibleMenuItem>
                    <FlowList project={project} as={CollapsibleMenuItem} />
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
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" />
                      </CheckboxGroup>
                    </CollapsibleMenuItem>
                    <FlowList project={project} as={CollapsibleMenuItem} />
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
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows">
                    <FlowList project={project} as={CollapsibleMenuItem} />
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
