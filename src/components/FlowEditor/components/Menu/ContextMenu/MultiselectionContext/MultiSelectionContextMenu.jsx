import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSelectedNodes,
  rotateSelectedNodes,
  setEnableSelectedNodes,
} from "store/reducers/flow/flowElementsSlice";
import { setMultiSelectionContextMenu } from "store/reducers/menuSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import NodeGroupMenu from "../../NodeGroupMenu/NodeGroupMenu";
import * as Styled from "../ElementContext/ElementContextMenu.style";

export default function MultiSelectionContextMenu() {
  const { multiSelectionMenu } = useSelector((state) => state.menus);
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
  }, [rotatePath]);

  useEffect(() => {
    setShowGroup(false);
    setOpen(false);
  }, [multiSelectionMenu.state]);

  const disableHandle = () => {
    dispatch(setEnableSelectedNodes());
  };
  return (
    <div>
      {multiSelectionMenu.state && (
        <Styled.Menu x={multiSelectionMenu.x} y={multiSelectionMenu.y}>
          <Styled.MenuItem onClick={rotateHandle}>Rotate</Styled.MenuItem>
          <Styled.MenuItem onClick={disableHandle}>Disable</Styled.MenuItem>
          <Styled.MenuItem onClick={groupHandle}>
            {open ? "Group <" : "Group >"}
          </Styled.MenuItem>
          <Styled.MenuItem onClick={deleteItems}>Delete</Styled.MenuItem>
          {showGroup && <NodeGroupMenu self={self} />}
        </Styled.Menu>
      )}
    </div>
  );
}
