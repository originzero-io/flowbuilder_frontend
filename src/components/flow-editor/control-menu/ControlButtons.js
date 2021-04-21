import React, { useCallback } from "react";
import { ControlButton,useZoomPanHelper } from "react-flow-renderer";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  MapIcon,
  DeleteIcon,
  RotateIcon,
} from "../../global/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setMiniMapDisplay,
  setGroupBarDisplay,
} from "../../../REDUX/actions/flowActions";
import {
  setTheme,
  setAlignAll,
  setFlagColor,
} from "../../../REDUX/actions/guiActions";
import * as themeColor from "../../../config/ThemeReference";
import { saveToDb } from "../../../app-global/db";
import Tooltips from "./Tooltips";
import * as tooltip from "../../../config/TooltipReference";
import Tooltip from "../../global/Tooltip";

export default function ControlButtons({ theme }) {
  const { reactFlowInstance, miniMapDisplay, groupBarDisplay } = useSelector(
    (state) => state.flowConfigReducer
  );
  const { alignAll } = useSelector((state) => state.guiConfigReducer);
  const { zoomIn, zoomOut, fitView } = useZoomPanHelper();
  const dispatch = useDispatch();
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
    <>
      <div data-tip="Undo" data-for={tooltip.UNDO}>
        <ControlButton>
          <UndoIcon
            theme={theme}
          // color={
          //   theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          // }
          />
        </ControlButton>
      </div>
      <div data-tip="Redo" data-for={tooltip.REDO}>
        <ControlButton>
          <RedoIcon
            theme={theme}
          //   color={
          //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          //   }
          />
        </ControlButton>
      </div>
      <div data-tip="Save" data-for={tooltip.SAVE}>
        <ControlButton onClick={saveFlow}>
          <SaveIcon
            theme={theme}
          //   color={
          //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          //   }
          />
        </ControlButton>
      </div>
      <div data-tip="Delete All" data-for={tooltip.DELETE_ALL}>
        <ControlButton onClick={deleteAllNodes}>
          <DeleteIcon
            theme={theme}
          //   color={
          //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          //   }
          />
        </ControlButton>
      </div>
      <div data-tip="Rotate All" data-for={tooltip.ROTATE_ALL}>
        <ControlButton onClick={rotateAllHandle}>
          <RotateIcon
            theme={theme}
          //   color={
          //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          //   }
          />
        </ControlButton>
      </div>
      <div data-tip="Minimap" data-for={tooltip.MINI_MAP}> 
        <ControlButton onClick={mapDisplayHandle}>
          <MapIcon
            theme={theme}
          //   color={
          //     theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          //   }
          />
        </ControlButton>
      </div>
      <div data-tip="Theme" data-for={tooltip.CHANGE_THEME}>
        <ControlButton onClick={changeTheme}>
          <i className="fas fa-sun" style={{ color: themeColor.DARK_ICON }}></i>
        </ControlButton>
      </div>
      <ControlButton onClick={zoomInHandle}>
          Zoom In
      </ControlButton>
      <ControlButton onClick={zoomOutHandle}>
          Zoom Out
      </ControlButton>
      <ControlButton onClick={fitViewHandle}>
          Fit View
        </ControlButton>
      <Tooltips theme={theme}/>
    </>
  );
}
