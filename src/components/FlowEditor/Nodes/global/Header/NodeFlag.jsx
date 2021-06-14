import React from "react";
import { GroupFlagIcon } from "../Icons";
import PropTypes from "prop-types"
function Flag({ self, onClick }) {
  return (
    <div onClick={onClick} style={{marginTop: "-4px", marginRight: "-3px" }}>
      <GroupFlagIcon color={self.data.group.color || "rgba(170,170,170,0.7)"} id={self.id}/>
    </div>
  );
}
export default Flag;
Flag.propTypes = {
  self: PropTypes.object.isRequired,
  onClick:PropTypes.func.isRequired
}