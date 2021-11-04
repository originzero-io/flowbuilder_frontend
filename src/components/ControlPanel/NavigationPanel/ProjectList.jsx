import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlowsByProjectService } from "../../../services/flowService";
import { deleteProjectService } from "../../../services/projectService";
import { loadFlows } from "../../../store/actions/flowActions";
import { deleteProject, setActiveProject, } from "../../../store/actions/projectActions";
import { CollapsibleMenuItem } from "../../Global/Collapsible/CollapsibleMenu";
import { VscTrash } from "react-icons/vsc";
import { setActivePanel } from "../../../store/actions/controlPanelActions";
import { setError } from "../../../store/actions/errorActions";
import { Badge } from "reactstrap";
export default function ProjectList() {
  const dispatch = useDispatch();
  const { projects,activeProject } = useSelector((state) => state.projectReducer);
  const clickProjectHandle = (project) => {    
    getFlowsByProjectService(project)
      .then((res) => {
        dispatch(loadFlows(res.flows));
        dispatch(setActivePanel("Projects"));
        dispatch(setActiveProject(project));
      })
      .catch((error) => dispatch(setError(error)));
  };
  const deleteProjectHandle = (project) => {
    if (confirm("Sure?")) {
      deleteProjectService(project._id)
        .then((res) => {
          dispatch(deleteProject(res.project._id))
        })
        .catch((err) => dispatch(setError(err)));
    }
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
            <Badge style={{marginLeft:'-15px',background:'rgb(22, 139, 63)'}}>{project.createdBy.username}</Badge>
            <div>{project.name}</div>
            <div onClick={() => deleteProjectHandle(project)}>
              <VscTrash style={{ fontSize: '20px' }}/>
            </div>
          </CollapsibleMenuItem>
        );
      })}
    </>
  );
}
