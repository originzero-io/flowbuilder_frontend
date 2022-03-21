import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { HorizontalDivider } from "../../../../StyledComponents/Divider";
import { MenuItem } from "./NavMenu.style";
import * as tooltip from "../../../../../constants/TooltipReference";
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
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setRotateAll,
  setExpandAll,
} from "../../../../../store/reducers/flow/flowElementsReducer";
import {
  setRotateAllPath,
} from "../../../../../store/reducers/flow/flowGuiReducer";
import * as themeColor from "../../../../../constants/ThemeReference";
import { useZoomPanHelper, useStoreActions } from "react-flow-renderer";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { useParams } from "react-router";
import { elementNamespace } from "../../../../../SocketConnections";
import useActiveFlow from "../../../../../hooks/useActiveFlow";
const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 6;
  bottom: 10px;
  left: 10px;
  padding: 4px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  color: ${(props) =>
    props.theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON};
`;
export default function ControlMenu() {
  const { flowGui,flowConfig,flowElements } = useActiveFlow();
  const { reactFlowInstance,rotateAllPath,theme } = flowGui;
  const canUndo = flowElements.past.length > 0;
  const canRedo = flowElements.future.length > 0;
  const { zoomIn, zoomOut, fitView } = useZoomPanHelper();
  const setInteractive = useStoreActions((actions) => actions.setInteractive);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const { flowId } = useParams();
  const saveFlow = useCallback(() => {
    //saveToDb(flowConfig,flowGui);
    const { position, zoom, elements } = reactFlowInstance.toObject();
    elementNamespace.emit('elements:save', { flow_id: flowId, elements })
  }, [reactFlowInstance]);

  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(setElements([]));
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
    zoomIn();
  };
  const zoomOutHandle = () => {
    zoomOut();
  };
  const fitViewHandle = () => {
    fitView({ padding: 0.2, includeHiddenNodes: true });
  };
  const lockHandle = () => {
    setLock(!lock);
  };
  const undoHandle = () => {
    dispatch(UndoActionCreators.undo());
  }
  const redoHandle = () => {
    dispatch(UndoActionCreators.redo());
  }
  useEffect(() => {
    setInteractive(lock);
  }, [lock]);
  return (
    <Menu theme={theme}>
      <MenuItem
        theme={theme}
        onClick={saveFlow}
        data-tip="Save"
        data-for={tooltip.SAVE}
      >
        <SaveIcon theme={theme} />
      </MenuItem>
      <HorizontalDivider theme={theme} />
      <MenuItem theme={theme} data-tip="Undo" data-for={tooltip.UNDO} onClick={undoHandle}>
        <UndoIcon theme={theme} disable={!canUndo} />
      </MenuItem>
      <MenuItem theme={theme} data-tip="Redo" data-for={tooltip.REDO} onClick={redoHandle}>
        <RedoIcon theme={theme} disable={!canRedo} />
      </MenuItem>
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
