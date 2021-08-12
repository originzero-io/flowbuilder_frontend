import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlowByProjectService } from "../../../../services/flowService";
import { deleteProjectService, getProjectsByTeamService } from "../../../../services/projectService";
import { loadFlows } from "../../../../store/actions/flowActions";
import { deleteProject, } from "../../../../store/actions/projectActions";
import { CollapsibleMenuItem } from "../../../global/Collapsible/CollapsibleMenu";
import { VscTrash } from "react-icons/vsc";
import { setActivePanel } from "../../../../store/actions/controlPanelActions";
export default function ProjectList() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectReducer);
  const { teams } = useSelector((state) => state.teamReducer);
  const clickProjectHandle = async (projectId) => {
    const data = await getFlowByProjectService(projectId);
    console.log("flows:", data);
    dispatch(loadFlows(data.flows));
    dispatch(setActivePanel("Projects"))
  };
  const deleteProjectHandle = async (e, project) => {
    e.stopPropagation();
    if (confirm("Sure?")) {
      console.log("project:", project);
      const data = await deleteProjectService(project._id);
      console.log("data:", data);
      dispatch(deleteProject(data.project._id))
    }
  };
  return (
    <>
      {projects.map((project) => {
        return (
          <CollapsibleMenuItem
            key={project._id}
            onClick={() => clickProjectHandle(project._id)}
          >
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
