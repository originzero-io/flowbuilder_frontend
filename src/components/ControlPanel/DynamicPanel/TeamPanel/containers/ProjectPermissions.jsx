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
      <PermissionContainer size="5%">
        <PermissionHeader>Project Create</PermissionHeader>
        <PermissionContent>
          <Checkbox name="all" size="30px" center={true} />
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer size="10%">
        <PermissionHeader>Dashboard Create</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleMenuItem key={project._id}>
                  <CheckboxGroup label={project.name}>
                    <Checkbox name="processorCreate" size="15px" />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>
      <PermissionContainer size="10%">
        <PermissionHeader>Flow Create</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleMenuItem key={project._id}>
                  <CheckboxGroup label={project.name}>
                    <Checkbox name="processorCreate" size="15px" />
                  </CheckboxGroup>
                </CollapsibleMenuItem>
              );
            })}
          </CollapsibleMenu>
        </PermissionContent>
      </PermissionContainer>

      <PermissionContainer size="17.5%">
        <PermissionHeader>Usage</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name} >`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" size="15px" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows >">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" size="15px" />
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
      <PermissionContainer size="17.5%">
        <PermissionHeader>Edit</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name} >`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" size="15px" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows >">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" size="15px" />
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
      <PermissionContainer size="17.5%">
        <PermissionHeader>Delete</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name} >`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" size="15px" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows >">
                    <CollapsibleMenuItem>
                      <CheckboxGroup label="All">
                        <Checkbox name="processorCreate" size="15px" />
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
      <PermissionContainer size="17.5%">
        <PermissionHeader>View</PermissionHeader>
        <PermissionContent>
          <CollapsibleMenu trigger="Projects >">
            <CollapsibleMenuItem>
              <CheckboxGroup label="All">
                <Checkbox name="processorCreate" size="15px" />
              </CheckboxGroup>
            </CollapsibleMenuItem>
            {projects.map((project) => {
              return (
                <CollapsibleSubMenu
                  key={project._id}
                  trigger={`${project.name} >`}
                >
                  <CollapsibleMenuItem>
                    <CheckboxGroup label="All">
                      <Checkbox name="processorCreate" size="15px" />
                    </CheckboxGroup>
                  </CollapsibleMenuItem>
                  <CollapsibleSubMenu trigger="Flows >">
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
