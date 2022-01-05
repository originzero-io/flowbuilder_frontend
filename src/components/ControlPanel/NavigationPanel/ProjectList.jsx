import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlowsByProject } from "../../../store/reducers/flow/flowReducer";
import { setActiveProject } from "../../../store/reducers/projectReducer";
import { CollapsibleMenuItem } from "../../global/Collapsible/CollapsibleMenu";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import { setModal } from "../../../store/reducers/componentReducer";
import EditProjectForm from "./EditProjectForm";
import { projectNamespace } from "../../../App";
import useProject from "../../../utils/useProject";
import usePermission from "../../../utils/usePermission";
export default function ProjectList() {
  const dispatch = useDispatch();
  const permission = usePermission();
  const { projects, activeProject } = useProject();
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
      {projects.length > 0 ? (
        projects.map((project) => {
          return (
            <CollapsibleMenuItem
              key={project._id}
              onClick={() => clickProjectHandle(project)}
              active={project._id === activeProject._id}
            >
              <div>{project.name}</div>
              <div>
                {permission?.CAN_EDIT_PROJECT && (
                  <span onClick={() => editProjectHandle(project)}>
                    <BiEdit style={{ fontSize: "2vmin" }} />
                  </span>
                )}
                {permission?.CAN_DELETE_PROJECT && (
                  <span onClick={() => deleteProjectHandle(project)}>
                    <VscTrash style={{ fontSize: "2vmin" }} />
                  </span>
                )}
              </div>
            </CollapsibleMenuItem>
          );
        })
      ) : (
        <span
          style={{ color: "white", fontSize: "1.5vmin", paddingLeft: "10%" }}
        >
          No projects found
        </span>
      )}
    </>
  );
}
