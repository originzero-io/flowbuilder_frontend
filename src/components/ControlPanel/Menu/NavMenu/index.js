import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProject,
  setActivePanel,
  setActiveProject,
} from "../../../../store/actions/controlPanelActions";
import { Container, NavMenu } from "./style";
import AddProjectForm from "../../SidePanel/Projects/AddProjectForm";
import {CollapsibleMenu,CollapsibleMenuItem,CollapsibleTrigger} from "../../../global/Collapsible/CollapsibleMenu";
import NavMenuItem from "./NavMenuItem";
import Modal from "../../../global/Modal";
import { LearnIcon } from "../../Icons";
const NavigationMenu = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { projects } = useSelector((state) => state.controlPanelReducer);
  const panelActiveHandler = (panel,project) => {
    if (panel === "Projects") {
      dispatch(setActiveProject(project));
    }
    dispatch(setActivePanel(panel));
  };
  const showModalHandle = (e) => {
    setShowModal(true);
  };
  const hideModalHandle = (e) => {
    setShowModal(false);
  };
  const deleteProjectHandle = (project) => {
    if (confirm("Sure?")) {
      dispatch(deleteProject(project));
    }
  };

  const projectItem = () => {
    return (
      <CollapsibleTrigger label="Projects" icon={<LearnIcon width="20px" color="white"/>}>
        <div onClick={showModalHandle}><i className="fas fa-plus-circle"></i></div>
      </CollapsibleTrigger>
    );
  };
  const settingsItem = () => {
    return (
      <CollapsibleTrigger label="Settings" icon={<LearnIcon width="20px" color="white"/>}>
      </CollapsibleTrigger>
    );
  };
  return (
    <Container>
      <NavMenu>
        <CollapsibleMenu trigger={projectItem()}>
          {projects.map((project) => {
            return (
              <CollapsibleMenuItem key={project.id} onClick={()=>panelActiveHandler("Projects",project)}>
                <div>{project.name}</div>
                <div onClick={()=>deleteProjectHandle(project)}><i className="fas fa-trash-alt"></i></div>
              </CollapsibleMenuItem>
            );
          })}
        </CollapsibleMenu>
        <NavMenuItem label="Teams" icon={<LearnIcon width="20px" color="white"/>} onClick={()=>panelActiveHandler("Teams")}></NavMenuItem>
        <NavMenuItem label="Learn" icon={<LearnIcon width="20px" color="white"/>} onClick={()=>panelActiveHandler("Learn")}></NavMenuItem>
        <NavMenuItem label="Notes" icon={<LearnIcon width="20px" color="white"/>} onClick={()=>panelActiveHandler("Notes")}></NavMenuItem>
        <NavMenuItem label="Devices" icon={<LearnIcon width="20px" color="white"/>} onClick={()=>panelActiveHandler("Devices")}></NavMenuItem>
        <CollapsibleMenu trigger={settingsItem()}>
          <CollapsibleMenuItem onClick={()=>panelActiveHandler("Settings")}>Account settings</CollapsibleMenuItem>
          <CollapsibleMenuItem onClick={()=>panelActiveHandler("Settings")}>Preferences</CollapsibleMenuItem>
        </CollapsibleMenu>
      </NavMenu>

      <Modal
        isOpen={showModal}
        onRequestClose={hideModalHandle}
      >
        <AddProjectForm closeModal={hideModalHandle} />
      </Modal>
    </Container>
  );
};

export default NavigationMenu;
