import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../store/reducers/componentReducer";
import { deleteWorkspace, setActiveWorkspace } from "../../../store/reducers/workspaceReducer";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import EditWorkspaceForm from "../WorkspacePanel/EditWorkspaceForm";
import { WorkspaceBrandWrapper } from "./style";
import PropTypes from "prop-types";
import { workspaceNamespace } from "../../global/SocketConnections";
const WorkspaceBrand = ({ workspace }) => {
  //console.log("TEAM BRAND RENDERED");
  const dispatch = useDispatch();
  const deleteWorkspaceHandler = () => {
    if (confirm(`${workspace.name} takımını silmek istiyor musunuz?`)) {
      workspaceNamespace.emit("workspaces:remove", { workspace });
      dispatch(setActiveWorkspace(""));
    }
  };
  const editWorkspaceHandler = () => {
    dispatch(setModal(<EditWorkspaceForm workspace={workspace} />));
  };
  return (
    <WorkspaceBrandWrapper>
      {workspace && (
        <>
          <span style={{fontSize:'2vmin'}}>{workspace.name}</span>
          <div>
            <span onClick={editWorkspaceHandler} style={{ marginRight: "5px" }}>
              <BiEdit style={{ fontSize: "2.5vmin" }} />
            </span>
            <span onClick={deleteWorkspaceHandler}>
              <VscTrash style={{ fontSize: "2.5vmin" }} />
            </span>
          </div>
        </>
      )}
    </WorkspaceBrandWrapper>
  );
};

WorkspaceBrand.propTypes = {
  workspace: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
export default React.memo(WorkspaceBrand);
