import React, { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { getFlowsByWorkspace } from "store/reducers/flow/flowSlice";
import { getNotesByWorkspace } from "store/reducers/noteSlice";
import {
  getProjectsByWorkspace,
  setActiveProject,
} from "store/reducers/projectSlice";
import {
  getMyWorkspaces,
  setActiveWorkspace,
} from "store/reducers/workspaceSlice";
import useAuth from "utils/hooks/useAuth";
import useDidMountEffect from "utils/hooks/useDidMountEffect";
import useWorkspace from "utils/hooks/useWorkspace";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import AddWorkspaceForm from "./AddWorkspaceForm";
import * as Styled from "./WorkspacePanel.style";

const WorkspacePanel = () => {
  const { workspaces, activeWorkspace } = useWorkspace();
  const auth = useAuth();
  const dispatch = useDispatch();
  // console.log("WORKSPACE_LIST RENDERED");
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
    dispatch(
      getMyPermissionInThisWorkspace({ workspace: activeWorkspace, me: auth }),
    );
  }, [auth, activeWorkspace]);

  const clickWorkspaceHandler = (workspace) => {
    dispatch(setActiveWorkspace(workspace));
  };
  const addWorkspaceHandler = () => {
    dispatch(setModal(<AddWorkspaceForm />));
  };
  return (
    <Styled.WorkspaceContainer>
      {workspaces.map((workspace) => (
        <Styled.WorkspaceItemWrapper
          key={workspace._id}
          active={workspace._id === activeWorkspace._id}
          onClick={() => clickWorkspaceHandler(workspace)}
        >
          <Styled.WorkspaceItem
            active={workspace._id === activeWorkspace._id}
            data-tip={workspace.name}
            data-for={workspace._id}
          >
            {workspace.name.split("")[0].toUpperCase()}
          </Styled.WorkspaceItem>
          <Tooltip id={workspace._id} place="top" type="light" />
        </Styled.WorkspaceItemWrapper>
      ))}

      {auth.role === "admin" && (
        <Styled.WorkspaceItemWrapper>
          <Styled.WorkspaceItem onClick={addWorkspaceHandler}>
            <VscAdd style={{ color: "white" }} />
          </Styled.WorkspaceItem>
        </Styled.WorkspaceItemWrapper>
      )}
    </Styled.WorkspaceContainer>
  );
};

export default WorkspacePanel;
