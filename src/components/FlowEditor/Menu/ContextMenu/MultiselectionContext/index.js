import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../ElementContext/style";
import { isNode, useStoreState } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { rotateMultiNode, setElements, setMultipleNodeEnable } from "../../../../../store/actions/elementsActions";
import { setMultiSelectionContextMenu } from "../../../../../store/actions/menuActions";
import GroupMenu from "../../GroupMenu";
import { deleteNodeCurrentGroup } from "../../../../../store/actions/nodeGroupsActions";

export default function MultiSelectionContextMenu() {
  const selected = useStoreState((state) => state.selectedElements);
  const { multiSelectionMenu } = useSelector(
    (state) => state.menuConfigReducer
  );
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  const dispatch = useDispatch();
  const deleteItems = () => {
    if (confirm("Are you sure?")) {
      const newElements = elements.filter(
        ({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1)
      );
      dispatch(setElements(newElements));
      dispatch(setMultiSelectionContextMenu(false));

      const nodesToRemove = selected.filter(s => isNode(s));
      nodesToRemove.map(els => {
        dispatch(deleteNodeCurrentGroup(els));
      })
    }
  };
  const [showGroup, setShowGroup] = useState(false);
  const [open, setOpen] = useState(false);
  const [rotatePath, setRotatePath] = useState("vertical");
  const groupHandle = (e) => {
    setOpen(!open);
    setShowGroup(!showGroup);
  };
  const rotateHandle = (e) => {
    const newPath = rotatePath === "vertical" ? "horizontal" : "vertical";
    setRotatePath(newPath);
  };
  useEffect(() => {
    if (selected) {
      const selectedElementIds = selected.map(s => s.id);
      dispatch(rotateMultiNode(selectedElementIds, rotatePath));
    }
  }, [rotatePath])

  useEffect(() => {
    setShowGroup(false);
    setOpen(false);
  }, [multiSelectionMenu.state])

  const disableHandle = () => {
    const selectedElementIds = selected.map(s => s.id);
    dispatch(setMultipleNodeEnable(selectedElementIds));
  }
  return (
    <div>
      {multiSelectionMenu.state && (
        <Menu x={multiSelectionMenu.x} y={multiSelectionMenu.y} theme={theme}>
          <MenuItem onClick={rotateHandle}>Rotate</MenuItem>
          <MenuItem onClick={disableHandle}>Disable</MenuItem>
          <MenuItem onClick={groupHandle}>{open ? "Group <" : "Group >"}</MenuItem>
          <MenuItem onClick={deleteItems}>Delete</MenuItem>
          {showGroup && <GroupMenu self={self} />}
        </Menu>
      )}
    </div>
  );
}
