import React, { useState } from "react";
import RotateButton from "../../../global/buttons/RotateButton";
import { NameEditIcon } from "../../../global/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { setNodeEnable } from "../../../../REDUX/actions/flowActions";
export default function FeatureIcons({ self, edit, setEdit }) {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer);
  const nameEditHandle = () => {
    setEdit(!edit);
  };
  const [checked, setChecked] = useState(self.data.enable);
  const enableChangeHandle = (checked) => {
    setChecked(checked);
    dispatch(setNodeEnable(self,checked))
  };
  return (
    <>
      <Switch
        checked={checked}
        onChange={enableChangeHandle}
        //onColor="#86d3ff"
        onColor="#bdc3c7"
        //onHandleColor="#2693e6"
        onHandleColor="#218c74"
        handleDiameter={10}
        uncheckedIcon={false}
        checkedIcon={false}
        height={10}
        width={20}
        className="react-switch"
        id="material-switch"
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
