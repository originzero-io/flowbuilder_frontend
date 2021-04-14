import React,{useCallback} from "react";
import { ControlButton } from "react-flow-renderer";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  MapIcon,
  DeleteIcon,
  RotateIcon,
} from "../global/SvgIcons";
import { useSelector, useDispatch } from 'react-redux'
import { setElements,setMiniMapDisplay,setGroupBarDisplay } from "../../REDUX/actions/flowActions";
import { setTheme, setAlignAll,setFlagColor } from "../../REDUX/actions/guiActions";
import * as themeColor from "../../config/ThemeReference"
import { saveToDb } from "../../app-global/db";
export default function ControlButtons({ theme }) {
    const {reactFlowInstance,miniMapDisplay,groupBarDisplay} = useSelector((state) => state.flowConfigReducer);
  const {alignAll} = useSelector((state) => state.guiConfigReducer);
  const dispatch = useDispatch();
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
      //developing commit
    }
  };
  return (
    <>
      <ControlButton>
        <UndoIcon
            // color={
            //   theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
            // }
        />
      </ControlButton>
      <ControlButton>
        <RedoIcon
        //   color={
        //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
        //   }
        />
      </ControlButton>
      <ControlButton onClick={saveFlow}>
        <SaveIcon
        //   color={
        //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
        //   }
        />
      </ControlButton>
      <ControlButton onClick={deleteAllNodes}>
        <DeleteIcon
        //   color={
        //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
        //   }
        />
      </ControlButton>
      <ControlButton onClick={rotateAllHandle}>
        <RotateIcon
        //   color={
        //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
        //   }
        />
      </ControlButton>
    </>
  );
}
