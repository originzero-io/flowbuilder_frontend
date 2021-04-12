import React from "react";
import NavMenus from "./nav-menus"
import PanelContextMenu from "./panel-context";
import MultiSelectionContextMenu from "./multiselection-context";
import ElementContextMenu from "./element-context";
import GroupBar from "./group-bar";
export default function AppMenu() {
  return (
    <>
      <NavMenus/>
      <PanelContextMenu />
      <MultiSelectionContextMenu />
      <ElementContextMenu />
      <GroupBar/>
    </>
  );
}
