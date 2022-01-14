import React from "react";
import PropTypes from "prop-types";
export default function Checkbox({
  name,
  onChange,
  onClick,
  size="17px",
  type,
  checked,
  defaultChecked,
  center = false,
  ...rest
}) {
  const checkbox_size = type === "main" ? "30px" : size;
  const centeredStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const checkbox = () => {
    return (
      <input
        name={name}
        type="checkbox"
        onChange={onChange}
        onClick={onClick}
        style={{ width: checkbox_size, height: checkbox_size,cursor:"pointer" }}
        checked={checked}
        defaultChecked={defaultChecked}
        {...rest}
      />
    );
  };
  return (
    <>{center ? <div style={centeredStyle}>{checkbox()}</div> : checkbox()}</>
  );
}
Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  center: PropTypes.bool,
};
