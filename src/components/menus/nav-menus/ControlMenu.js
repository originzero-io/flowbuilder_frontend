import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { saveToDb } from "../../../app-global/db";
//import Divider from "../../style-components/Divider";
import { MenuItem } from "./style";
import * as tooltip from "../../../config/TooltipReference";
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
} from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setMiniMapDisplay,
  setRotateAll,
  setExpandAll,
  setRotateAllPath
} from "../../../REDUX/actions/flowActions";
import {setTheme} from "../../../REDUX/actions/guiActions";
import * as themeColor from "../../../config/ThemeReference";
import { useZoomPanHelper, useStoreActions } from "react-flow-renderer";
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
  const { reactFlowInstance, miniMapDisplay } = useSelector(
    (state) => state.flowConfigReducer
  );
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { rotateAllPath } = useSelector((state) => state.flowConfigReducer);
  const elements = useSelector((state) => state.elementReducer);
  const { zoomIn, zoomOut, fitView } = useZoomPanHelper();
  const setInteractive = useStoreActions((actions) => actions.setInteractive);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const [lock, setLock] = useState(true);
  const saveFlow = useCallback(() => {
    saveToDb(reactFlowInstance);
  }, [reactFlowInstance]);
  const mapDisplayHandle = () => {
    if (miniMapDisplay === "visible") {
      dispatch(setMiniMapDisplay("hidden"));
    } else {
      dispatch(setMiniMapDisplay("visible"));
    }
  };
  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(setElements([]));
    }
  };
  const closeAllNodes = () => {
    dispatch(setExpandAll(false));
  }

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

  const changeTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };
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
  useEffect(() => {
    setInteractive(lock);
  }, [lock]);
  return (
    <Menu theme={theme}>
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
      <MenuItem theme={theme} data-tip="Undo" data-for={tooltip.UNDO}>
        <UndoIcon theme={theme} />
      </MenuItem>
      <MenuItem theme={theme} data-tip="Redo" data-for={tooltip.REDO}>
        <RedoIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={saveFlow}
        data-tip="Save"
        data-for={tooltip.SAVE}
      >
        <SaveIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={deleteAllNodes}
        data-tip="Delete All"
        data-for={tooltip.DELETE_ALL}
      >
        <DeleteIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={mapDisplayHandle}
        data-tip="Map"
        data-for={tooltip.MINI_MAP}
      >
        <MapIcon theme={theme} />
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={changeTheme}
        data-tip="Change Theme"
        data-for={tooltip.CHANGE_THEME}
      >
        <i className="fas fa-sun"></i>
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={closeAllNodes}
        data-tip="Close All Nodes"
        data-for={tooltip.CLOSE_ALL_NODES}
      >
        <i class="fas fa-arrows-alt-v"></i>
      </MenuItem>
      <MenuItem
        theme={theme}
        onClick={selectAllNodes}
        data-tip="Select All Nodes"
        data-for={tooltip.SELECT_ALL_NODES}
      >
        <i class="fas fa-object-group"></i>
      </MenuItem>
    </Menu>
  );
}
