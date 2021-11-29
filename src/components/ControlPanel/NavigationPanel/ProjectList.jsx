import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlowsByProject } from "../../../store/reducers/flow/flowReducer";
import { setActiveProject } from "../../../store/reducers/projectReducer";
import { CollapsibleMenuItem } from "../../global/Collapsible/CollapsibleMenu";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";

import { Badge } from "reactstrap";
import { setModal } from "../../../store/reducers/componentReducer";
import EditProjectForm from "./EditProjectForm";
import { projectNamespace } from "../../../App";
export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects,activeProject } = useSelector((state) => state.projects);
  const clickProjectHandle = (project) => {    
    dispatch(setActiveProject(project));
    dispatch(getFlowsByProject(project));
  };
  const deleteProjectHandle = (project) => {
    if (confirm("Sure?")) {
      projectNamespace.emit("projects:remove", { project });
    }
  };
  const editProjectHandle = (project) => {
    dispatch(setModal(<EditProjectForm project={project} />));
  };
  return (
    <>
      {projects.map((project) => {
        return (
          <CollapsibleMenuItem
            key={project._id}
            onClick={() => clickProjectHandle(project)}
            active={project._id === activeProject._id}
          >
            {/* <Badge style={{marginLeft:'-15px',background:'rgb(22, 139, 63)'}}>{project.createdBy.username}</Badge> */}
            <div>{project.name}</div>
            <div>
              <span onClick={() => editProjectHandle(project)}>
                <BiEdit style={{ fontSize: '20px' }}/>
              </span>
              <span onClick={() => deleteProjectHandle(project)}>
                <VscTrash style={{ fontSize: '20px' }}/>
              </span>
            </div>
          </CollapsibleMenuItem>
        );
      })}
    </>
  );
}
