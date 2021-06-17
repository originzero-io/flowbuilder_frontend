import React, { useState } from "react";
import RotateButton from "../../../../global/Button/RotateButton";
import SwitchButton from "../../../../global/Button/SwitchButton";
import { NameEditIcon } from "../../../../global/icons";
import { useSelector, useDispatch } from "react-redux";
import { setNodeEnable, setOutgoersEnable } from "../../../../../store/actions/elementsActions";
import { getIncomers, getOutgoers } from "react-flow-renderer";
import { openNotification as notification } from "../../../../../app-global/dom/notification";
import PropTypes from "prop-types"
export default function FeatureIcons({ self, edit, setEdit }) {
  const dispatch = useDispatch();
  const { elementReducer } = useSelector((state) => state.activeFlowReducer);
  const elements = elementReducer.present;
  const nameEditHandle = () => {
    setEdit(!edit);
  };
  const [checked, setChecked] = useState(self.data.enable);
  const enableChangeHandle = (checked) => {
    const incomers = getIncomers(self, elements);
    const disableCount = incomers.filter(incomer => incomer.data.enable === false).length;
    const enableCount = incomers.filter(incomer => incomer.data.enable === true).length;
    if (incomers.length > 0 && incomers.length === disableCount) {
      notification("Warning", "First, make sure that at least one of your incomers is enabled.", "warning", 5000);
    }
    else {
      if (enableCount === 0) {
        console.log("enable count",enableCount)
        setChecked(checked);
        dispatch(setNodeEnable(self, checked))
        const outgoers = getOutgoers(self, elements);
        const outgoersIds = outgoers.map(o => o.id);
        dispatch(setOutgoersEnable(outgoersIds,checked));
      }
      else {
        console.log("enable count",enableCount)

        setChecked(checked);
        dispatch(setNodeEnable(self, checked))
      }
      
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

FeatureIcons.propTypes = {
  self: PropTypes.object.isRequired,
  edit:PropTypes.bool.isRequired,
  setEdit:PropTypes.func.isRequired,
}
