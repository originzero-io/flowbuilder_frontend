import React, { useContext } from "react";
import { Menu, MenuItem } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setElementContextMenu } from "../../../REDUX/actions/menuActions";
import { setElements } from "../../../REDUX/actions/flowActions";

export default function ElementMenu() {

  const elements = useSelector((state) => state.elementReducer);
  const {elementMenu} = useSelector((state) => state.menuConfigReducer);
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

    const newElements = elements.map(els => {
      if (els.id === element.id) {
        return {
          ...els,
          data: {
            ...els.data,
            align:newAlign
          }
        }
      }
      else {
        return els;
      }
    })
    dispatch(setElements(newElements));
    dispatch(setElementContextMenu(false));
  }
  return (
    <div>
      {elementMenu.state === true && (
        <Menu x={elementMenu.x} y={elementMenu.y} theme={theme}>
          <MenuItem>Save</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={rotateItem}>Rotate</MenuItem>
          <MenuItem onClick={deleteItem}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
}
