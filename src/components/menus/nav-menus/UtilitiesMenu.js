import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { getDataFromDb, saveToDb } from "../../../globals/db/index";
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
} from "../../icon-components/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import { setElements,setMiniMapDisplay } from "../../../REDUX/actions/flowActions";
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
  min-width:400px;
`;
export default function UtilitiesMenu() {
  const reactFlowInstance = useSelector((state) => state.reactFlowInstanceReducer);
  const theme = useSelector((state) => state.themeReducer);
  const miniMapDisplay = useSelector((state) => state.miniMapDisplayReducer);
  const alignAll = useSelector((state) => state.alignAllReducer);
  const elements = useSelector((state) => state.elementReducer);
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
      <MenuItem data-tip="Undo" data-for={tooltip.UNDO}>
        <UndoIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></UndoIcon>
      </MenuItem>
      <Divider />
      <MenuItem data-tip="Redo" data-for={tooltip.REDO}>
        <RedoIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></RedoIcon>
      </MenuItem>
      <Divider />
      <MenuItem onClick={saveFlow} data-tip="Save" data-for={tooltip.SAVE}>
        <SaveIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></SaveIcon>
      </MenuItem>
      <Divider />
      <MenuItem theme={theme} onClick={changeTheme} data-tip="Change Theme" data-for={tooltip.CHANGE_THEME}>
        <i className="fas fa-sun"></i>
      </MenuItem>
      <Divider />
      <MenuItem theme={theme} data-tip="Change Flag Color" data-for={tooltip.CHANGE_FLAG_COLOR}>
        <input type="color" onChange={changeFlagColor} />
      </MenuItem>
      <Divider />
      <MenuItem onClick={mapDisplayHandle} data-tip="Map" data-for={tooltip.MINI_MAP}>
        <MapIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></MapIcon>
      </MenuItem>
      <MenuItem onClick={deleteAllNodes} data-tip="Delete Nodes" data-for={tooltip.DELETE_ALL}>
        <DeleteIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}/>
      </MenuItem>
      <MenuItem onClick={rotateAllHandle} data-tip="Rotate Nodes" data-for={tooltip.ROTATE_ALL}>
        <RotateIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON} />
      </MenuItem>
      <MenuItem theme={theme} onClick={handleFullScreen}>
        Full Screen
      </MenuItem>

      <Tooltip id={tooltip.REDO} place="top" type={theme==="dark" ? "light" : "dark"}></Tooltip>
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
