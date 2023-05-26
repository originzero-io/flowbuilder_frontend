import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setElementContextMenu } from "store/reducers/menuSlice";
import { deleteNode, rotateNode } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import * as Styled from "./ElementContextMenu.style";

export default function ElementMenu() {
  const { flowElements } = useActiveFlow();
  // const elements = flowElements;
  const { elementMenu } = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  const deleteItem = () => {
    const { element } = elementMenu;
    dispatch(deleteNode(element));
    dispatch(setElementContextMenu(false));
  };
  const rotateItem = () => {
    const { element } = elementMenu;
    dispatch(rotateNode(element));
    dispatch(setElementContextMenu(false));
  };
  return (
    <div>
      {elementMenu.state === true && (
        <Styled.Menu x={elementMenu.x} y={elementMenu.y}>
          <Styled.MenuItem>Edit</Styled.MenuItem>
          <Styled.MenuItem onClick={rotateItem}>Rotate</Styled.MenuItem>
          <Styled.MenuItem onClick={deleteItem}>Delete</Styled.MenuItem>
        </Styled.Menu>
      )}
    </div>
  );
}
