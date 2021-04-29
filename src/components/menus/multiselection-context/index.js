import React, { useState } from "react";
import { Menu, MenuItem } from "../element-context/style";
import { useStoreState } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../../REDUX/actions/flowActions";
import { setMultiSelectionContextMenu } from "../../../REDUX/actions/menuActions";
import GroupMenu from "../group-menu";

export default function MultiSelectionContextMenu() {
  const selected = useStoreState((state) => state.selectedElements);
  const { multiSelectionMenu } = useSelector(
    (state) => state.menuConfigReducer
  );
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const deleteItems = () => {
    const newElements = elements.filter(
      ({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1)
    );
    dispatch(setElements(newElements));
    dispatch(setMultiSelectionContextMenu(false));
  };
  const [showGroup, setShowGroup] = useState(false);
  const { closeAllGroupMenu } = useSelector((state) => state.guiConfigReducer);
  const groupHandle = (e) => {
    setShowGroup(!showGroup);
  };
  return (
    <div>
      {multiSelectionMenu.state === true && (
        <Menu x={multiSelectionMenu.x} y={multiSelectionMenu.y} theme={theme}>
          <MenuItem onClick={deleteItems}>Delete</MenuItem>
          <MenuItem onClick={groupHandle}>{"Group->"}</MenuItem>
          {showGroup && <GroupMenu self={self} multiSelection={selected} />}
        </Menu>
      )}
    </div>
  );
}
