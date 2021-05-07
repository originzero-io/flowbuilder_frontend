import React from "react";
import NavMenus from "./nav-menus"
import PanelContextMenu from "./context-menus/panel-context";
import MultiSelectionContextMenu from "./context-menus/multiselection-context";
import ElementContextMenu from "./context-menus/element-context";
import GroupBar from "./group-bar";
const AppMenu = () => {
  return (
    <>
      <NavMenus/>
      <PanelContextMenu />
      <MultiSelectionContextMenu />
      <ElementContextMenu />
      <GroupBar />
    </>
  );
}

export default AppMenu;
