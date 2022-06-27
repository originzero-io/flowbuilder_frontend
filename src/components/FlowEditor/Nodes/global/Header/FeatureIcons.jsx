import PropTypes from "prop-types";
import React, { useState } from "react";
import { getIncomers, getOutgoers } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { setNodeEnable, setOutgoersEnable } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "hooks/useActiveFlow";
import RotateButton from "../../../Nodes/global/RotateButton";
import SwitchButton from "../../../Nodes/global/SwitchButton";
import { NameEditIcon } from "components/Shared/icons";
import toast from "react-hot-toast"

const propTypes = {
  self: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};
export default function FeatureIcons({ self, edit, setEdit }) {
  const dispatch = useDispatch();
  const { flowElements } = useActiveFlow();
  const nameEditHandle = () => {
    setEdit(!edit);
  };
  const [checked, setChecked] = useState(self.data.enable);
  const enableChangeHandle = (checked) => {
    const incomers = getIncomers(self, flowElements.nodes, flowElements.edges);
    const disableCount = incomers.filter(incomer => incomer.data.enable === false).length;
    if (incomers.length > 0 && incomers.length === disableCount) {
      toast("First, make sure that at least one of your incomers is enabled");
    }
    else {
      setChecked(checked);
      dispatch(setNodeEnable({self, checked})) 
    }
  };
  return (
    <>
      <SwitchButton
        checked={checked}
        onChange={enableChangeHandle}
        width={20}
        height={10}
      />
      <NameEditIcon
        theme="dark"
        onClick={nameEditHandle}
        width="15px"
        height="15px"
      />
      <RotateButton self={self} />
    </>
  );
}

FeatureIcons.propTypes = propTypes;
