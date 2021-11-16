import React, { useEffect,useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../store/reducers/componentReducer";
import { getFlowsByWorkspace } from "../../../store/reducers/flow/flowReducer";
import { loadProjects } from "../../../store/reducers/projectReducer";
import { getWorkspaces,setActiveWorkspace } from "../../../store/reducers/workspaceReducer";
import useDidMountEffect from "../../../utils/useDidMountEffect";
import AddWorkspaceForm from "./AddWorkspaceForm";
import { AddWorkSpaceButton, WorkspaceItem, WorkspaceContainer } from "./style";

const WorkspaceList = () => {
  const { workspaces,activeWorkspace } = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();
  console.log("workspace list rendered");
  useEffect(() => {
    dispatch(getWorkspaces());
  }, []);
  useDidMountEffect(() => {
    dispatch(setActiveWorkspace(workspaces[0]));
  }, [workspaces])

  const clickWorkspaceHandler = (workspace) => {
    dispatch(setActiveWorkspace(workspace))
    dispatch(loadProjects(workspace));
    dispatch(getFlowsByWorkspace(workspace));
  };
  return (
    <WorkspaceContainer>
      {workspaces.map((workspace) => {
        return (
          <WorkspaceItem
            key={workspace._id}
            active={workspace._id === activeWorkspace._id}
            onClick={()=>clickWorkspaceHandler(workspace)}
          >
            <div style={{color:'white',paddingLeft:'8px',paddingRight:'8px',borderRadius:'4px'}}>
              {workspace.name.split("")[0].toUpperCase()}
            </div>
          </WorkspaceItem>
        );
      })}
      <AddWorkSpaceButton onClick={()=>dispatch(setModal(<AddWorkspaceForm/>))}>
        <VscAdd style={{ color:"white" }}/>
      </AddWorkSpaceButton>
    </WorkspaceContainer>
  );
};

export default React.memo(WorkspaceList);
