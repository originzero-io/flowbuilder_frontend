import React, { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { setModal } from "../../../store/reducers/componentReducer";
import { getFlowsByWorkspace } from "../../../store/reducers/flow/flowReducer";
import { getProjectsByWorkspace } from "../../../store/reducers/projectReducer";
import {
  getMyWorkspaces,
  setActiveWorkspace
} from "../../../store/reducers/workspaceReducer";
import useDidMountEffect from "../../../utils/useDidMountEffect";
import useWorkspace from "../../../utils/useWorkspace";
import AddWorkspaceForm from "./AddWorkspaceForm";
import {
  WorkspaceContainer, WorkspaceItem, WorkspaceItemWrapper
} from "./style";
const WorkspaceList = () => {
  const { workspaces, activeWorkspace } = useWorkspace();
  const dispatch = useDispatch();
  //console.log("workspace list rendered");
  useEffect(() => {
    dispatch(getMyWorkspaces());
  }, []);
  useDidMountEffect(() => {
    if (workspaces.length > 0) {
      dispatch(setActiveWorkspace(workspaces[0]));
      dispatch(getProjectsByWorkspace(workspaces[0]))
    }
  }, [workspaces]);

  const clickWorkspaceHandler = (workspace) => {
    dispatch(setActiveWorkspace(workspace));
    dispatch(getProjectsByWorkspace(workspace));
    dispatch(getFlowsByWorkspace(workspace));
  };
  const addWorkspaceHandler = () => {
    dispatch(setModal(<AddWorkspaceForm />))
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
            <WorkspaceItem active={workspace._id === activeWorkspace._id} data-tip={workspace.name} data-for={workspace._id}>
              {workspace.name.split("")[0].toUpperCase()}
            </WorkspaceItem>
            <ReactTooltip id={workspace._id} place="right" type="light" effect="solid"/>
          </WorkspaceItemWrapper>
        );
      })}
      
      <WorkspaceItemWrapper>
        <WorkspaceItem onClick={addWorkspaceHandler}>
          <VscAdd style={{ color: "white"}} />
        </WorkspaceItem>
      </WorkspaceItemWrapper>
    </WorkspaceContainer>
  );
};

export default React.memo(WorkspaceList);
