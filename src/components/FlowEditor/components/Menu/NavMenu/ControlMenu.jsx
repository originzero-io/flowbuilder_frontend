import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { HorizontalDivider } from "components/StyledComponents/Divider";
import * as tooltip from "constants/TooltipReference";
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setRotateAll,
  setExpandAll,
  deleteAllElements,
} from "store/reducers/flow/flowElementsSlice";
import { setRotateAllPath } from "store/reducers/flow/flowGuiSlice";
import { useStore, useReactFlow } from "reactflow";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useParams } from "react-router";
import { elementNamespace } from "SocketConnections";
import useActiveFlow from "hooks/useActiveFlow";
import FlowService from "services/configurationService/flowService";
import notification from "utils/notificationHelper";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  DeleteIcon,
  RotateAllIcon,
  FitViewIcon,
  ZoomInIcon,
  ZoomOutIcon,
  LockIcon,
  UnLockIcon,
  ExpandAllIcon,
} from "./Icons";
import { MenuItem } from "./NavMenu.style";

const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 6;
  bottom: 10px;
  left: 10px;
  padding: 4px;
  background: ${(props) => props.theme.menuBackground};
`;
export default function ControlMenu() {
  const { flowGui, flowConfig, flowElements } = useActiveFlow();
  const { rotateAllPath, theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  // const canUndo = flowElements.past.length > 0;
  // const canRedo = flowElements.future.length > 0;

  // Todo: useReactFlow();
  // const { zoomIn, zoomOut, fitView } = useReactFlow();

  // const setInteractive = useStore((actions) => actions.setInteractive);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const { flowId } = useParams();
  const saveFlow = async () => {
    // saveToDb(flowConfig,flowGui);
    const { nodes, edges, viewport } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfig,
      gui: {
        ...flowGui,
        viewport,
      },
    };
    await FlowService.saveFlowGui(flowId, flow);
    elementNamespace.emit("elements:save", {
      flowId,
      elements: { nodes, edges },
    });
    notification.success("Flow saved successfully");
  };

  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(deleteAllElements());
    }
  };
  const closeAllNodes = () => {
    dispatch(setExpandAll(false));
  };

  const rotateAllHandle = () => {
    if (rotateAllPath === "vertical") {
      dispatch(setRotateAllPath("horizontal"));
    } else {
      dispatch(setRotateAllPath("vertical"));
    }
  };
  useEffect(() => {
    dispatch(setRotateAll(rotateAllPath));
  }, [rotateAllPath]);

  const zoomInHandle = () => {
    reactFlowInstance.zoomIn();
  };
  const zoomOutHandle = () => {
    reactFlowInstance.zoomOut();
  };
  const fitViewHandle = () => {
    reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true });
  };
  const lockHandle = () => {
    setLock(!lock);
  };
  // const undoHandle = () => {
  //   dispatch(UndoActionCreators.undo());
  // }
  // const redoHandle = () => {
  //   dispatch(UndoActionCreators.redo());
  // }

  // useEffect(() => {
  //   setInteractive(lock);
  // }, [lock]);
  return (
    <Menu>
      <MenuItem
        theme={theme}
        onClick={saveFlow}
        data-tip="Save"
        data-for={tooltip.SAVE}
      >
        <SaveIcon theme={theme} />
      </MenuItem>
      <HorizontalDivider theme={theme} />
      {/* <MenuItem theme={theme} data-tip="Undo" data-for={tooltip.UNDO} onClick={undoHandle}>
        <UndoIcon theme={theme} disable={!canUndo} />
      </MenuItem>
      <MenuItem theme={theme} data-tip="Redo" data-for={tooltip.REDO} onClick={redoHandle}>
        <RedoIcon theme={theme} disable={!canRedo} />
      </MenuItem> */}
      <HorizontalDivider theme={theme} />
      <MenuItem
        theme={theme}
        onClick={closeAllNodes}
        data-tip="Close All Nodes"
        data-for={tooltip.CLOSE_ALL_NODES}
      >
        <ExpandAllIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={rotateAllHandle}
        data-tip="Rotate All"
        data-for={tooltip.ROTATE_ALL}
      >
        <RotateAllIcon theme={theme} />
      </MenuItem>

      <MenuItem
        theme={theme}
        onClick={deleteAllNodes}
        data-tip="Delete All"
        data-for={tooltip.DELETE_ALL}
      >
        <DeleteIcon theme={theme} />
      </MenuItem>

      <HorizontalDivider theme={theme} />
      <MenuItem
        theme={theme}
        onClick={zoomInHandle}
        data-tip="Zoom in"
        data-for={tooltip.ZOOM_IN}
      >
        <ZoomInIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={zoomOutHandle}
        data-tip="Zoom out"
        data-for={tooltip.ZOOM_OUT}
      >
        <ZoomOutIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={fitViewHandle}
        data-tip="Fit View"
        data-for={tooltip.FIT_VIEW}
      >
        <FitViewIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={lockHandle}
        data-tip="Lock Screen"
        data-for={tooltip.LOCK_SCREEN}
      >
        {lock === true ? (
          <UnLockIcon theme={theme} />
        ) : (
          <LockIcon theme={theme} />
        )}
      </MenuItem>
    </Menu>
  );
}
