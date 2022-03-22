import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../ElementContext/ElementContextMenu.style";
import { isNode, useStoreState } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import { rotateMultiNode, setElements, setMultipleNodeEnable } from "store/reducers/flow/flowElementsReducer";
import { setMultiSelectionContextMenu } from "store/reducers/menuReducer";
import NodeGroupMenu from "../../NodeGroupMenu/NodeGroupMenu";
import useActiveFlow from "hooks/useActiveFlow";

export default function MultiSelectionContextMenu() {
  const selected = useStoreState((state) => state.selectedElements);
  const { multiSelectionMenu } = useSelector(
    (state) => state.menus
  );
  const { flowElements, flowGui } = useActiveFlow();
  const { theme } = flowGui;
  const elements = flowElements.present;
  const dispatch = useDispatch();
  const deleteItems = () => {
    if (confirm("Are you sure?")) {
      const newElements = elements.filter(
        ({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1)
      );
      dispatch(setElements(newElements));
      dispatch(setMultiSelectionContextMenu(false));
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
          {showGroup && <NodeGroupMenu self={self} />}
        </Menu>
      )}
    </div>
  );
}
