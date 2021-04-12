import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { getDataFromDb, saveToDb } from "../../../app-global/db/index";
import Divider from "../../global/Divider";
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
const Menu = styled(MenuIndex)`
  bottom: 10px;
  left: 48px;
  padding: 4px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  color: ${(props) => (props.theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON)};
  width:100px;
`;
export default function UtilitiesMenu() {
  const {reactFlowInstance,miniMapDisplay,groupBarDisplay} = useSelector((state) => state.flowConfigReducer);
  const {theme,alignAll} = useSelector((state) => state.guiConfigReducer);
  const dispatch = useDispatch();

  const changeTheme = () => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };
  const saveFlow = useCallback(() => {
    saveToDb(reactFlowInstance);
  }, [reactFlowInstance]);
  const changeFlagColor = (e) => {
    dispatch(setFlagColor(e.target.value));
  };
  const mapDisplayHandle = () => {
    if (miniMapDisplay === "visible") {
      dispatch(setMiniMapDisplay("hidden"));
    } else {
      dispatch(setMiniMapDisplay("visible"));
    }
  };
  const deleteAllNodes = () => {
    dispatch(setElements([]))
  };
  const rotateAllHandle = () => {
    if (alignAll === "vertical") {
      dispatch(setAlignAll("horizontal"))
    }
    else {
      dispatch(setAlignAll("vertical"))
    }
  };
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch(console.log);
  };

  return (
    <Menu theme={theme}>
      <MenuItem theme={theme} onClick={changeTheme} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <i className="fas fa-sun"></i>
      </MenuItem>
      {/* <MenuItem onClick={mapDisplayHandle} data-tip="Map" data-for={tooltip.MINI_MAP}>
        <MapIcon
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></MapIcon>
      </MenuItem> */}
      
      <Tooltip id={tooltip.REDO} place="top" type={theme === "dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.UNDO} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.SAVE} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.CHANGE_THEME} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.CHANGE_FLAG_COLOR} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.MINI_MAP} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.DELETE_ALL} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
      <Tooltip id={tooltip.ROTATE_ALL} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
    </Menu>
  );
}
