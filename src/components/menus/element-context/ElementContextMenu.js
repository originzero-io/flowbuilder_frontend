import React, { useContext } from "react";
import { Menu, MenuItem } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setElementContextMenu } from "../../../REDUX/actions/menuActions";
import { setElements } from "../../../REDUX/actions/flowActions";

export default function ElementMenu() {

  const elements = useSelector((state) => state.elementReducer);
  const showElementMenu = useSelector((state) => state.elementMenuReducer);
  const theme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const deleteItem = () => {
    const { element } = showElementMenu;
    const newElements = elements.filter((els) => els.id !== element.id);
    dispatch(setElements(newElements));
    dispatch(setElementContextMenu(false));
  };
  const rotateItem = () => {
    const { element } = showElementMenu;
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
      {showElementMenu.state === true && (
        <Menu x={showElementMenu.x} y={showElementMenu.y} theme={theme}>
          <MenuItem>Save</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={rotateItem}>Rotate</MenuItem>
          <MenuItem onClick={deleteItem}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
}
