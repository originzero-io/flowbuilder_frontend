import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CollapsibleMenu,
  CollapsibleMenuItem,
  CollapsibleTrigger,
} from "components/Shared/Collapsible/CollapsibleMenu";
import { AiOutlineProject } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdDevicesOther } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { setModal } from "store/reducers/componentSlice";
import { Link, useRouteMatch } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useWorkspace from "hooks/useWorkspace";
import useAuthPermission from "hooks/useAuthPermission";
import useProject from "hooks/useProject";
import Avatar from "components/Shared/Avatar";
import WorkspaceBrand from "./WorkspaceBrand";
import ProjectList from "./ProjectList.jsx";
import NavMenuItem from "./NavMenuItem";
import AddProjectForm from "./AddProjectForm";
import { Container, Footer, NavMenu } from "./NavigationPanel.style";

const NavigationPanel = () => {
  const dispatch = useDispatch();
  const getPermission = useAuthPermission("project");
  const { url } = useRouteMatch();
  const { activeWorkspace } = useWorkspace();
  const { projects } = useProject();
  const { name, avatar } = useAuth();
  // console.log("NAVIGATION_PANEL RENDERED");
  const showModalHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeWorkspace) {
      dispatch(setModal(<AddProjectForm />));
    } else alert("Firstly, create a workspace.");
  };
  const projectItem = () => (
    <CollapsibleTrigger
      label={`Projects (${projects.length})`}
      icon={<AiOutlineProject />}
    >
      {getPermission("CAN_CREATE_PROJECT") && (
        <div onClick={(e) => showModalHandle(e)}>
          <BsPlusCircle style={{ fontSize: "2vmin" }} />
        </div>
      )}
    </CollapsibleTrigger>
  );
  const settingsItem = () => (
    <CollapsibleTrigger label="Settings" icon={<FiSettings />} />
  );
  return (
    <Container>
      <NavMenu>
        <WorkspaceBrand workspace={activeWorkspace} />
        <CollapsibleMenu trigger={projectItem()}>
          <Link to={`${url}/projects`}>
            <ProjectList projects={projects} />
          </Link>
        </CollapsibleMenu>
        <Link to={`${url}/team`}>
          <NavMenuItem label="Team" icon={<RiTeamLine />} />
        </Link>
        <Link to={`${url}/notes`}>
          <NavMenuItem label="Notes" icon={<CgNotes />} />
        </Link>
        <Link to={`${url}/devices`}>
          <NavMenuItem label="Devices" icon={<MdDevicesOther />} />
        </Link>
        <Link to={`${url}/settings`}>
          <CollapsibleMenu trigger={settingsItem()}>
            <CollapsibleMenuItem>Account settings</CollapsibleMenuItem>
            <CollapsibleMenuItem>Permission settings</CollapsibleMenuItem>
            <CollapsibleMenuItem>Preferences</CollapsibleMenuItem>
          </CollapsibleMenu>
        </Link>
      </NavMenu>
      <Footer>
        <Avatar avatar={avatar} size={24} />
        <div
          style={{
            color: "whitesmoke",
            letterSpacing: "2px",
            paddingLeft: "10px",
          }}
        >
          {name}
        </div>
      </Footer>
    </Container>
  );
};

export default NavigationPanel;
