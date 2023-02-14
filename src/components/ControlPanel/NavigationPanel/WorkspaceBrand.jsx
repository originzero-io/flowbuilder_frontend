import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import {
  setActiveWorkspace,
} from "store/reducers/workspaceSlice";
import { VscTrash } from "react-icons/vsc";
import { BiEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import { workspaceNamespace } from "SocketConnections";
import useAuth from "hooks/useAuth";
import useWorkspace from "hooks/useWorkspace";
import { WorkspaceBrandWrapper } from "./NavigationPanel.style";
import EditWorkspaceForm from "../WorkspacePanel/EditWorkspaceForm";

const propTypes = {
  workspace: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const WorkspaceBrand = ({ workspace }) => {
  const { role } = useAuth();
  const dispatch = useDispatch();
  const { workspaces } = useWorkspace();
  const deleteWorkspaceHandler = () => {
    if (confirm(`Would you like to delete ${workspace.name} workspace?`)) {
      workspaceNamespace.emit("workspaces:delete", { workspace });
      dispatch(setActiveWorkspace(workspaces[0]));
    }
  };
  const editWorkspaceHandler = () => {
    dispatch(setModal(<EditWorkspaceForm workspace={workspace} />));
  };

  return (
    <WorkspaceBrandWrapper>
      {workspace && (
        <>
          <span style={{ fontSize: "2vmin" }}>{workspace.name}</span>
          {role === "admin" && (
            <div>
              <span
                onClick={editWorkspaceHandler}
                style={{ marginRight: "5px" }}
              >
                <BiEdit style={{ fontSize: "2.5vmin" }} />
              </span>
              <span onClick={deleteWorkspaceHandler}>
                <VscTrash style={{ fontSize: "2.5vmin" }} />
              </span>
            </div>
          )}
        </>
      )}
    </WorkspaceBrandWrapper>
  );
};

WorkspaceBrand.propTypes = propTypes;

export default React.memo(WorkspaceBrand);
