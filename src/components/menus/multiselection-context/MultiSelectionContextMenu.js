import React, { useContext } from "react";
import { Menu, MenuItem } from "../element-context/style";
import ReactFlow, { useStoreState } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../../REDUX/actions/flowActions";
import { setMultiSelectionContextMenu } from "../../../REDUX/actions/menuActions";

export default function MultiSelectionContextMenu() {
  const selected = useStoreState((state) => state.selectedElements);
  const multiSelectionMenu = useSelector((state) => state.multiSelectionMenuReducer);
  const theme = useSelector((state) => state.themeReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const deleteItems = () => {
    const newElements = elements.filter(({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1));
    dispatch(setElements(newElements));
    dispatch(setMultiSelectionContextMenu(false));
  };
  return (
    <div>
      {multiSelectionMenu.state === true && (
        <Menu x={multiSelectionMenu.x} y={multiSelectionMenu.y} theme={theme}>
          <MenuItem onClick={deleteItems}>Sil</MenuItem>
        </Menu>
      )}
    </div>
  );
}
