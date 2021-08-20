import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlowByProjectService } from "../../../services/flowService";
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
  const { projects } = useSelector((state) => state.projectReducer);
  const clickProjectHandle = (project) => {    
    getFlowByProjectService(project._id)
      .then((res) => {
        console.log("flows:", res);
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
          >
            <Badge style={{marginLeft:'-15px'}} color="success">{project.createdBy}</Badge>
            <div>{project.name}</div>
            <div onClick={(e) => deleteProjectHandle(e,project)}>
              <VscTrash style={{ fontSize: '20px' }}/>
            </div>
          </CollapsibleMenuItem>
        );
      })}
    </>
  );
}
