import React from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";
import * as themeColor from "constants/ThemeReference";
export default function SwitchButton({
  checked=false,
  defaultChecked,
  onChange,
  width=30,
  height=15
}) {
  return (
    <>
      <Switch
        checked={checked}
        defaultChecked={defaultChecked}
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
  );
}

SwitchButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
