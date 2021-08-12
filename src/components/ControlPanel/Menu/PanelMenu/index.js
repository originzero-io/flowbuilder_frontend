import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActivePanel,
  setActiveProject,
} from "../../../../store/actions/controlPanelActions";
import { Container, NavMenu, TeamBrand } from "./style";
import AddProjectForm from "../../SidePanel/ProjectsPanel/forms/AddProjectForm";
import {
  CollapsibleMenu,
  CollapsibleMenuItem,
  CollapsibleTrigger,
} from "../../../global/Collapsible/CollapsibleMenu";
import NavMenuItem from "./NavMenuItem";
import Modal from "../../../global/Modal";
import ProjectList from "./ProjectList.jsx";

import { AiOutlineProject } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdDevicesOther } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { getFlowsService } from "../../../../services/flowService";
import { loadFlows } from "../../../../store/actions/flowActions";

const ControlPanelMenu = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const panelActiveHandler = (panel, project) => {
    if (panel === "Projects") {
      dispatch(setActiveProject(project));
    }
    dispatch(setActivePanel(panel));
  };
  const showModalHandle = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const hideModalHandle = (e) => {
    //e.stopPropagation();
    setShowModal(false);
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger
        label="Projects"
        icon={<AiOutlineProject/>}
        onClick={() => panelActiveHandler("Projects")}
      >
        <div onClick={showModalHandle}>
          <BsPlusCircle/>
        </div>
      </CollapsibleTrigger>
    );
  };
  const settingsItem = () => {
    return (
      <CollapsibleTrigger
        label="Settings"
        icon={<FiSettings/>}
        onClick={() => panelActiveHandler("Settings")}
      />
    );
  };

  const allFlowsHandle = async () => {
    panelActiveHandler("Projects");
    const data = await getFlowsService();
    dispatch(loadFlows(data.flows));
  }

  return (
    <Container>
      <TeamBrand>{activeTeam.name}</TeamBrand>
      <NavMenu>
        <NavMenuItem
          label="All Flows"
          icon={<BiBrain/>}
          onClick={allFlowsHandle}
        />
        <CollapsibleMenu trigger={projectItem()}>
          <ProjectList />
        </CollapsibleMenu>
        <NavMenuItem
          label="Learn"
          icon={<BiBrain/>}
          onClick={() => panelActiveHandler("Learn")}
        />
        <NavMenuItem
          label="Notes"
          icon={<CgNotes/>}
          onClick={() => panelActiveHandler("Notes")}
        />
        <NavMenuItem
          label="Devices"
          icon={<MdDevicesOther/>}
          onClick={() => panelActiveHandler("Devices")}
        />
        <CollapsibleMenu trigger={settingsItem()}>
          <CollapsibleMenuItem onClick={() => panelActiveHandler("Settings")}>
            Account settings
          </CollapsibleMenuItem>
          <CollapsibleMenuItem onClick={() => panelActiveHandler("Settings")}>
            Preferences
          </CollapsibleMenuItem>
        </CollapsibleMenu>
      </NavMenu>

      <Modal isOpen={showModal} onRequestClose={hideModalHandle}>
        <AddProjectForm closeModal={hideModalHandle} />
      </Modal>
    </Container>
  );
};

export default ControlPanelMenu;
