import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../store/reducers/componentReducer";
import { deleteWorkspace, setActiveWorkspace } from "../../../store/reducers/workspaceReducer";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import EditWorkspaceForm from "../WorkspacePanel/EditWorkspaceForm";
import { WorkspaceBrandWrapper } from "./style";
import PropTypes from "prop-types";
const WorkspaceBrand = ({ workspace }) => {
  //console.log("TEAM BRAND RENDERED");
  const dispatch = useDispatch();
  const { activeWorkspace } = useSelector((state) => state.workspaces);
  const deleteWorkspaceHandler = () => {
    if (confirm(`${workspace.name} takımını silmek istiyor musunuz?`)) {
      dispatch(deleteWorkspace(workspace));
      dispatch(setActiveWorkspace(""));
    }
  };
  const editWorkspaceHandler = () => {
    dispatch(setModal( <EditWorkspaceForm />));
  };
  return (
    <WorkspaceBrandWrapper>
      {activeWorkspace && (
        <>
          <span>{workspace.name}</span>
          <div>
            <span onClick={editWorkspaceHandler} style={{ marginRight: "5px" }}>
              <BiEdit style={{ fontSize: "20px" }} />
            </span>
            <span onClick={deleteWorkspaceHandler}>
              <VscTrash style={{ fontSize: "20px" }} />
            </span>
          </div>
        </>
      )}
    </WorkspaceBrandWrapper>
  );
};

WorkspaceBrand.propTypes = {
  team: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default React.memo(WorkspaceBrand);
