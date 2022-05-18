import React, { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { setModal } from "store/reducers/componentReducer";
import { getFlowsByWorkspace } from "store/reducers/flow/flowReducer";
import { getNotesByWorkspace } from "store/reducers/notesReducer";
import { getProjectsByWorkspace, setActiveProject } from "store/reducers/projectReducer";
import {
  getMyWorkspaces,
  setActiveWorkspace,
} from "store/reducers/workspaceReducer";
import useAuth from "hooks/useAuth";
import useDidMountEffect from "hooks/useDidMountEffect";
import useWorkspace from "hooks/useWorkspace";
import AddWorkspaceForm from "./AddWorkspaceForm";
import {
  WorkspaceContainer,
  WorkspaceItem,
  WorkspaceItemWrapper,
} from "./WorkspacePanel.style";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionReducer";

const WorkspacePanel = () => {
  const { workspaces, activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const dispatch = useDispatch();
  //console.log("WORKSPACE_LIST RENDERED");
  useEffect(() => {
    dispatch(getMyWorkspaces());
  }, []);
  useDidMountEffect(() => {
    if (!activeWorkspace && workspaces.length > 0) {
      dispatch(setActiveWorkspace(workspaces[0]));
    }
  }, [workspaces]);
  useDidMountEffect(() => {
    dispatch(getFlowsByWorkspace(activeWorkspace));
    dispatch(getProjectsByWorkspace(activeWorkspace));
    dispatch(getNotesByWorkspace(activeWorkspace));
    dispatch(setActiveProject(""));
    dispatch(getMyPermissionInThisWorkspace(activeWorkspace,auth));
  }, [auth, activeWorkspace])

  const clickWorkspaceHandler = (workspace) => {
    dispatch(setActiveWorkspace(workspace));
  };
  const addWorkspaceHandler = () => {
    dispatch(setModal(<AddWorkspaceForm />));
  };
  return (
    <WorkspaceContainer>
      {workspaces.map((workspace) => {
        return (
          <WorkspaceItemWrapper
            key={workspace._id}
            active={workspace._id === activeWorkspace._id}
            onClick={() => clickWorkspaceHandler(workspace)}
          >
            <WorkspaceItem
              active={workspace._id === activeWorkspace._id}
              data-tip={workspace.name}
              data-for={workspace._id}
            >
              {workspace.name.split("")[0].toUpperCase()}
            </WorkspaceItem>
            <ReactTooltip
              id={workspace._id}
              place="right"
              type="light"
              effect="solid"
            />
          </WorkspaceItemWrapper>
        );
      })}

      {auth.role === "admin" && (
        <WorkspaceItemWrapper>
          <WorkspaceItem onClick={addWorkspaceHandler}>
            <VscAdd style={{ color: "white" }} />
          </WorkspaceItem>
        </WorkspaceItemWrapper>
      )}
    </WorkspaceContainer>
  );
};

export default WorkspacePanel;
