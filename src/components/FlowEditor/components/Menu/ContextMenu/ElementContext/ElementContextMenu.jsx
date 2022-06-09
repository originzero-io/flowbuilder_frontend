import React from "react";
import { Menu, MenuItem } from "./ElementContextMenu.style";
import { useSelector, useDispatch } from "react-redux";
import { setElementContextMenu } from "store/reducers/menuSlice";
import { rotateNode, setElements } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "hooks/useActiveFlow";

export default function ElementMenu() {
  const { flowElements } = useActiveFlow();
  const elements = flowElements;
  const { elementMenu } = useSelector((state) => state.menus);
  const theme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const deleteItem = () => {
    const { element } = elementMenu;
    const newElements = elements.filter((els) => els.id !== element.id);
    dispatch(setElements(newElements));
    dispatch(setElementContextMenu(false));
  };
  const rotateItem = () => {
    const { element } = elementMenu;
    const currentAlign = element.data.align;
    let newAlign;
    if (currentAlign === "vertical") {
      newAlign = "horizontal";
    }
    else newAlign = "vertical"
    
    dispatch(rotateNode({self: element, path: newAlign}))
    dispatch(setElementContextMenu(false));
  }
  return (
    <div>
      {elementMenu.state === true && (
        <Menu x={elementMenu.x} y={elementMenu.y} theme={theme}>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={rotateItem}>Rotate</MenuItem>
          <MenuItem onClick={deleteItem}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
}
