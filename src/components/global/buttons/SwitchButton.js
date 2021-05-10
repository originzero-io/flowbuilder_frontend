import React from 'react'
import Switch from "react-switch"
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
