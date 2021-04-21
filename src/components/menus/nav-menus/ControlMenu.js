import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { getDataFromDb, saveToDb } from "../../../app-global/db/index";
import Divider from "../../style-components/Divider";
import { MenuIndex, MenuItem } from "./style";
import * as tooltip from "../../../config/TooltipReference";
import Tooltip from "../../global/Tooltip";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  MapIcon,
  DeleteIcon,
  RotateIcon
} from "../../global/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import { setElements,setMiniMapDisplay,setGroupBarDisplay } from "../../../REDUX/actions/flowActions";
import { setTheme, setAlignAll,setFlagColor } from "../../../REDUX/actions/guiActions";
import * as themeColor from "../../../config/ThemeReference"
import { useZoomPanHelper } from "react-flow-renderer";
const Menu = styled.div`
  position:absolute;
  
  display:flex;
  flex-direction:column;
  z-index:6;
  bottom: 10px;
  left: 10px;
  padding: 4px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  color: ${(props) => (props.theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON)};
`;
export default function ControlMenu() {
  const {reactFlowInstance,miniMapDisplay,groupBarDisplay} = useSelector((state) => state.flowConfigReducer);
  const dispatch = useDispatch();
  const {theme,alignAll} = useSelector((state) => state.guiConfigReducer);
  const { zoomIn, zoomOut, fitView } = useZoomPanHelper();

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
    dispatch(setElements([]));
  };
  const rotateAllHandle = () => {
    if (alignAll === "vertical") {
      dispatch(setAlignAll("horizontal"));
    } else {
      dispatch(setAlignAll("vertical"));
    }
  };

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
    fitView({padding:0.2,includeHiddenNodes:true});
  };

  return (
    <Menu theme={theme}>
      <MenuItem theme={theme} onClick={zoomInHandle} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        ZI
      </MenuItem>
      <MenuItem theme={theme} onClick={zoomOutHandle} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        ZO
      </MenuItem>
      <MenuItem theme={theme} onClick={fitViewHandle} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        FW
      </MenuItem>
      <MenuItem theme={theme} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <UndoIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <RedoIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} onClick={saveFlow} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <SaveIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} onClick={saveFlow} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <DeleteIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} onClick={saveFlow} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <RotateIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} onClick={mapDisplayHandle} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <MapIcon theme={theme}/>
      </MenuItem>
      <MenuItem theme={theme} onClick={changeTheme} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <i className="fas fa-sun"></i>
      </MenuItem>
    </Menu>
  );
}
