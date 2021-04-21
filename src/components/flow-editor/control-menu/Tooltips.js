import React from 'react'
import Tooltip from "../../global/Tooltip"
import * as tooltip from "../../../config/TooltipReference";

export default function Tooltips({theme}) {
    return (
        <>
          <Tooltip id={tooltip.REDO} place="right" type={theme === "dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.UNDO} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.SAVE} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.CHANGE_THEME} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.CHANGE_FLAG_COLOR} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.MINI_MAP} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.DELETE_ALL} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>
          <Tooltip id={tooltip.ROTATE_ALL} place="right" type={theme==="dark" ? "light" : "dark"}></Tooltip>  
        </>
    )
}
