import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../ElementContext/ElementContextMenu.style";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelectedNodes, rotateSelectedNodes, setEnableSelectedNodes } from "store/reducers/flow/flowElementsSlice";
import { setMultiSelectionContextMenu } from "store/reducers/menuSlice";
import NodeGroupMenu from "../../NodeGroupMenu/NodeGroupMenu";
import useActiveFlow from "hooks/useActiveFlow";

export default function MultiSelectionContextMenu() {
  //const selected = useStore((state) => state.selectedElements);
  const { multiSelectionMenu } = useSelector(
    (state) => state.menus
  );
  const { flowGui } = useActiveFlow();
  const { theme } = flowGui;
  //const elements = flowElements;
  const dispatch = useDispatch();
  const deleteItems = () => {
    if (confirm("Are you sure?")) {
      dispatch(deleteSelectedNodes());
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
    dispatch(rotateSelectedNodes({ path: rotatePath }));
  }, [rotatePath])

  useEffect(() => {
    setShowGroup(false);
    setOpen(false);
  }, [multiSelectionMenu.state])

  const disableHandle = () => {
    dispatch(setEnableSelectedNodes());
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
