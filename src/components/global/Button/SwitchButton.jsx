import React from 'react'
import Switch from "react-switch"
import PropTypes from "prop-types"
import * as themeColor from "../../../config/ThemeReference"
export default function SwitchButton({checked,onChange,width,height}) {
    return (
        <>
          <Switch
              checked={checked}
              onChange={onChange}
              onColor="#888888"
              onHandleColor={themeColor.HOVER_COLOR}
              handleDiameter={height}
              uncheckedIcon={false}
              checkedIcon={false}
              height={height}
              width={width}
              className="react-switch"
              id="material-switch"
            />  
        </>
    )
}

SwitchButton.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}
