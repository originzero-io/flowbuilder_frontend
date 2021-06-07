import React from 'react'
import Switch from "react-switch"
import PropTypes from "prop-types"
export default function SwitchButton({checked,onChange,width,height}) {
    return (
        <>
          <Switch
              checked={checked}
              onChange={onChange}
              onColor="#888888"
              onHandleColor="#1dd1a1"
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
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}
