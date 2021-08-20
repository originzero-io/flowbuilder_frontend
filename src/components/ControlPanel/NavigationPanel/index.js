import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActivePanel,
  setActiveProject,
} from "../../../store/actions/controlPanelActions";
import { Container, NavMenu, TeamBrand } from "./style";
import AddProjectForm from "../DynamicPanel/ProjectsPanel/forms/AddProjectForm";
import {
  CollapsibleMenu,
  CollapsibleMenuItem,
  CollapsibleTrigger,
} from "../../Global/Collapsible/CollapsibleMenu";
import NavMenuItem from "./NavMenuItem";
import ProjectList from "./ProjectList.jsx";
import { AiOutlineProject } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdDevicesOther } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { getFlowsService } from "../../../services/flowService";
import { loadFlows } from "../../../store/actions/flowActions";
import { setError } from "../../../store/actions/errorActions";
import { setModal } from "../../../store/actions/componentActions";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { deleteTeamService } from "../../../services/teamService";
import { deleteTeam, setActiveTeam } from "../../../store/actions/teamActions";
import { Link,useRouteMatch } from "react-router-dom";
import EditTeamForm from "../TeamPanel/EditTeamForm";

const ControlPanelMenu = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const { projects } = useSelector((state) => state.projectReducer);
  const showModalHandle = () => {
    dispatch(setModal(true, <AddProjectForm />));
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger
        label="Projects"
        icon={<AiOutlineProject />}
      >
        <div onClick={showModalHandle}>
          <BsPlusCircle />
        </div>
      </CollapsibleTrigger>
    );
  };
  const settingsItem = () => {
    return (
      <CollapsibleTrigger
        label="Settings"
        icon={<FiSettings />}
      />
    );
  };

  const allFlowsHandle = () => {
    getFlowsService()
      .then((res) => {
        dispatch(loadFlows(res.flows));
      })
      .catch((err) => dispatch(setError(err)));
  };

  const deleteTeamHandler = () => {
    if (confirm(`${activeTeam.name} takımını silmek istiyor musunuz?`)) {
      deleteTeamService(activeTeam._id)
        .then(res => {
          dispatch(deleteTeam(res.team._id));
        })
        .catch(err => dispatch(setError(err)));
    }
  };
  const editTeamHandler = () => {
    dispatch(setModal(true,<EditTeamForm/>))
  };
  return (
    <Container>
      <TeamBrand>
        <span>{activeTeam.name}</span>
        <div>
          <span onClick={editTeamHandler} style={{marginRight:'5px'}}>
            <BiEdit style={{ fontSize: '20px' }} />
          </span> 
          <span onClick={deleteTeamHandler}>
            <VscTrash style={{ fontSize: '20px' }} />
          </span> 
        </div>
      </TeamBrand>
      <NavMenu>
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
        <Link to={`${url}/learn`}>
          <NavMenuItem
            label="Learn"
            icon={<BiBrain />}
          />
        </Link>
        <Link to={`${url}/notes`}>
          <NavMenuItem
            label="Notes"
            icon={<CgNotes />}
          />
        </Link>
        <Link to={`${url}/devices`}>
          <NavMenuItem
            label="Devices"
            icon={<MdDevicesOther />}
          />
        </Link>
        <Link to={`${url}/settings`}>
          <CollapsibleMenu trigger={settingsItem()}>
            <CollapsibleMenuItem>
              Account settings
            </CollapsibleMenuItem>
            <CollapsibleMenuItem>
              Preferences
            </CollapsibleMenuItem>
          </CollapsibleMenu>
        </Link>
      </NavMenu>
    </Container>
  );
};

export default ControlPanelMenu;
