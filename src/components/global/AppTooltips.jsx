import React from 'react'
import Tooltip from "./Tooltip"
import * as tooltip from "../../config/TooltipReference";
export default function AppTooltips() {
    return (
        <>
          <Tooltip id={tooltip.REDO} place="right"/>
          <Tooltip id={tooltip.UNDO} place="right"/>
          <Tooltip id={tooltip.SAVE} place="right"/>
          <Tooltip id={tooltip.CHANGE_THEME} place="right"/>
          <Tooltip id={tooltip.CHANGE_FLAG_COLOR} place="right"/>
          <Tooltip id={tooltip.MINI_MAP} place="right"/>
          <Tooltip id={tooltip.DELETE_ALL} place="right"/>
          <Tooltip id={tooltip.ROTATE_ALL} place="right"/>  
          <Tooltip id={tooltip.ZOOM_IN} place="right"/>  
          <Tooltip id={tooltip.ZOOM_OUT} place="right"/>  
          <Tooltip id={tooltip.FIT_VIEW} place="right"/>  
          <Tooltip id={tooltip.LOCK_SCREEN} place="right"/>  
          <Tooltip id={tooltip.CLOSE_ALL_NODES} place="right"/>   
          <Tooltip id={tooltip.SELECT_ALL_NODES} place="right"/>   
          <Tooltip id={tooltip.SHARE} place="left"/>  
          <Tooltip id={tooltip.LEARN} place="bottom"/>
          <Tooltip id={tooltip.SETTINGS} place="bottom"/>
        </>
    )
}
