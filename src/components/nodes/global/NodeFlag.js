import React from "react";
import { GroupFlagIcon } from "../../global/SvgIcons";
function Flag({ self, onClick }) {
  return (
    <div onClick={onClick} style={{ marginTop: "-5px", marginRight: "0px" }}>
      <GroupFlagIcon color={self.data.group.color || "rgb(70,70,70)"} id={self.id}/>
    </div>
  );
}
export default Flag;
