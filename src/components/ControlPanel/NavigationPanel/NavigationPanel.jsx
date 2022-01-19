import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Footer, NavMenu } from "./style";
import AddProjectForm from "./AddProjectForm";
import {
  CollapsibleMenu,
  CollapsibleMenuItem,
  CollapsibleTrigger,
} from "../../global/Collapsible/CollapsibleMenu";
import NavMenuItem from "./NavMenuItem";
import ProjectList from "./ProjectList.jsx";
import { AiOutlineProject } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdDevicesOther } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { getFlowsByWorkspace } from "../../../store/reducers/flow/flowReducer";
import { setModal } from "../../../store/reducers/componentReducer";
import { Link, useRouteMatch } from "react-router-dom";
import WorkspaceBrand from "./WorkspaceBrand";
import useAuth from "../../../utils/useAuth";
import useWorkspace from "../../../utils/useWorkspace";
import usePermission from "../../../utils/usePermission";
import useProject from "../../../utils/useProject";
import Avatar from "../../global/Avatar";
import useFlow from "../../../utils/useFlow";
import { Badge } from "reactstrap";

const ControlPanelMenu = () => {
  const dispatch = useDispatch();
  const permissions = usePermission("CAN_CREATE_PROJECT");
  const { url } = useRouteMatch();
  const { activeWorkspace } = useWorkspace();
  const { projects } = useProject();
  const flows = useFlow();
  const { name, avatar } = useAuth();
  const showModalHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeWorkspace) {
      dispatch(setModal(<AddProjectForm />));
    } else alert("Firstly, create a workspace.");
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger label={`Projects (${projects.length})`} icon={<AiOutlineProject/>}>
        <div onClick={(e) => showModalHandle(e)}>
          {permissions?.CAN_CREATE_PROJECT && <BsPlusCircle style={{fontSize:'2vmin'}} />}
        </div>
      </CollapsibleTrigger>
    );
  };
  const settingsItem = () => {
    return <CollapsibleTrigger label="Settings" icon={<FiSettings />} />;
  };
  return (
    <Container>
      <NavMenu>
        <WorkspaceBrand workspace={activeWorkspace} />
        <Link to={`${url}/all`}>
          <NavMenuItem
            label={`All Flows (${flows.length})`}
            icon={<BiBrain />}
          />
        </Link>
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
        <Avatar avatar={avatar} size={24}/>
        <div style={{color:'whitesmoke',letterSpacing:'2px',paddingLeft:'10px'}}>{name}</div>
      </Footer>
    </Container>
  );
};

export default ControlPanelMenu;
