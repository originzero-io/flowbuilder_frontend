import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { saveToDb } from "../../../../app-global/db";
import { HorizontalDivider } from "../../../style-components/Divider";
import { MenuItem } from "./style";
import * as tooltip from "../../../../config/TooltipReference";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  MapIcon,
  DeleteIcon,
  RotateAllIcon,
  FitViewIcon,
  ZoomInIcon,
  ZoomOutIcon,
  LockIcon,
  UnLockIcon,
  SelectAllIcon,
  ExpandAllIcon,
} from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setRotateAll,
  setExpandAll,
} from "../../../../store/actions/elementsActions";
import {
  setMiniMapDisplay,
  setRotateAllPath,
} from "../../../../store/actions/flowActions";
import * as themeColor from "../../../../config/ThemeReference";
import { useZoomPanHelper, useStoreActions, isNode } from "react-flow-renderer";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { deleteNodeCurrentGroup } from "../../../../store/actions/nodeGroupsActions";
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
  const { reactFlowInstance } = useSelector((state) => state.flowConfigReducer);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { rotateAllPath } = useSelector((state) => state.flowConfigReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  const canUndo = useSelector((state) => state.elementReducer).past.length > 0;
  const canRedo = useSelector((state) => state.elementReducer).future.length > 0;
  const { zoomIn, zoomOut, fitView } = useZoomPanHelper();
  const setInteractive = useStoreActions((actions) => actions.setInteractive);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const [lock, setLock] = useState(true);
  const saveFlow = useCallback(() => {
    saveToDb(reactFlowInstance);
  }, [reactFlowInstance]);

  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(setElements([]));
      const nodesToRemove = elements.filter(els => isNode(els));
      nodesToRemove.map(els => {
        dispatch(deleteNodeCurrentGroup(els));
      })
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
  const selectAllNodes = () => {
    setSelectedElements(elements);
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
      {/* <MenuItem
        theme={theme}
        onClick={selectAllNodes}
        data-tip="Select All Nodes"
        data-for={tooltip.SELECT_ALL_NODES}
      >
        <SelectAllIcon theme={theme} />
      </MenuItem> */}
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
