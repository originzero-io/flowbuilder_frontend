import React from "react";
import PropTypes from "prop-types";
import { GroupFlagIcon } from "../Icons";

const propTypes = {
  self: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
function Flag({ self, onClick }) {
  return (
    <div onClick={onClick} style={{ marginTop: "-4px", marginRight: "-3px" }}>
      <GroupFlagIcon
        color={self.data.group.color || "rgba(170,170,170,0.7)"}
        id={self.id}
      />
    </div>
  );
}
Flag.propTypes = propTypes;

export default Flag;
