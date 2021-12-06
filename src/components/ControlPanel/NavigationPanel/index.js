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
import { Badge } from "reactstrap";
import useAuth from "../../../utils/useAuth";
import useWorkspace from "../../../utils/useWorkspace";

const ControlPanelMenu = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { activeWorkspace } = useWorkspace();
  const { username } = useAuth();
  const showModalHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeWorkspace) {
      dispatch(setModal(<AddProjectForm />));
    } else alert("Firstly, create a workspace.");
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger label="Projects" icon={<AiOutlineProject />}>
        <div onClick={(e) => showModalHandle(e)}>
          <BsPlusCircle />
        </div>
      </CollapsibleTrigger>
    );
  };
  const settingsItem = () => {
    return <CollapsibleTrigger label="Settings" icon={<FiSettings />} />;
  };

  const allFlowsHandle = () => {
    activeWorkspace && dispatch(getFlowsByWorkspace(activeWorkspace));
  };

  return (
    <Container>
      <NavMenu>
        <WorkspaceBrand workspace={activeWorkspace} />
        <Link to={`${url}/all`}>
          <NavMenuItem
            label="All Flows"
            icon={<BiBrain />}
            onClick={allFlowsHandle}
          />
        </Link>
        <Link to={`${url}/projects`}>
          <CollapsibleMenu trigger={projectItem()}>
            <ProjectList />
          </CollapsibleMenu>
        </Link>
        <Link to={`${url}/team`}>
          <NavMenuItem label="Team" icon={<RiTeamLine />} />
        </Link>
        <Link to={`${url}/learn`}>
          <NavMenuItem label="Learn" icon={<BiBrain />} />
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
            <CollapsibleMenuItem>Preferences</CollapsibleMenuItem>
          </CollapsibleMenu>
        </Link>
      </NavMenu>
      <Footer>
        Logged in as:{" "}
        <Badge
          color="success"
          style={{
            fontSize: "14px",
            color: "black",
          }}
        >
          {username}
        </Badge>
      </Footer>
    </Container>
  );
};

export default ControlPanelMenu;
