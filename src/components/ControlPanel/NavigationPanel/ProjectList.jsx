import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentReducer";
import { setActiveProject } from "store/reducers/projectReducer";
import usePermission from "hooks/usePermission";
import useProject from "hooks/useProject";
import useWorkspace from "hooks/useWorkspace";
import { CollapsibleMenuItem } from "components/Shared/Collapsible/CollapsibleMenu";
import { projectNamespace } from "SocketConnections";
import EditProjectForm from "./EditProjectForm";
export default function ProjectList({ projects }) {
  const dispatch = useDispatch();
  const permission = usePermission();
  const { activeProject } = useProject();
  const { activeWorkspace } = useWorkspace();
  const clickProjectHandle = (project) => {
    dispatch(setActiveProject(project));
    //dispatch(getFlowsByProject(project));
  };
  const deleteProjectHandle = (project) => {
    if (confirm("Sure?")) {
      projectNamespace.emit("projects:remove", { project });
    }
  };
  const editProjectHandle = (project) => {
    dispatch(setModal(<EditProjectForm project={project} />));
  };
  useEffect(() => {
    if (projects.length > 0 && activeProject === "") {
      dispatch(setActiveProject(projects[0]));
    }
  }, [activeWorkspace, projects]);

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
                <span onClick={() => editProjectHandle(project)}>
                  <BiEdit style={{ fontSize: "2vmin" }} />
                </span>
                <span onClick={() => deleteProjectHandle(project)}>
                  <VscTrash style={{ fontSize: "2vmin" }} />
                </span>
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

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
};
