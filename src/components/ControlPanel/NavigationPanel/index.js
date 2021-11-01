import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, NavMenu } from "./style";
import AddProjectForm from "./AddProjectForm";
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
import { getFlowsByTeamService, getFlowsService } from "../../../services/flowService";
import { loadFlows } from "../../../store/actions/flowActions";
import { setError } from "../../../store/actions/errorActions";
import { setModal } from "../../../store/actions/componentActions";
import { Link,useRouteMatch } from "react-router-dom";
import TeamBrand from "./TeamBrand";

const ControlPanelMenu = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { activeTeam, teams } = useSelector((state) => state.teamReducer);
  const showModalHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeTeam) {
      dispatch(setModal(true, <AddProjectForm />));
    }
    else alert("Firstly, create a team.");
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger
        label="Projects"
        icon={<AiOutlineProject />}
      >
        <div onClick={(e)=>showModalHandle(e)}>
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
    getFlowsByTeamService(activeTeam)
      .then((res) => {
        if (teams.length > 0) {
          dispatch(loadFlows(res.flows));
        }
        else dispatch(loadFlows([]));
      })
      .catch((err) => dispatch(setError(err)));
  };

  return (
    <Container>
      <TeamBrand team={activeTeam}/>
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
