import React from "react";
import PropTypes from "prop-types";
import { GroupFlagIcon } from "../NodeIcons";

const propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
function Flag({ color, onClick }) {
  return (
    <div onClick={onClick} style={{ marginTop: "-4px", marginRight: "-3px" }}>
      <GroupFlagIcon color={color || "rgba(170,170,170,0.7)"} />
    </div>
  );
}
Flag.propTypes = propTypes;

export default Flag;
