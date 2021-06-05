import React from "react";
import { GroupFlagIcon } from "../Icons";
import PropTypes from "prop-types"
function Flag({ self, onClick }) {
  return (
    <div onClick={onClick} style={{marginTop: "-4px", marginRight: "-4px" }}>
      <GroupFlagIcon color={self.data.group.color || "rgb(70,70,70)"} id={self.id}/>
    </div>
  );
}
export default Flag;
Flag.propTypes = {
  self: PropTypes.object.isRequired,
  onClick:PropTypes.func.isRequired
}