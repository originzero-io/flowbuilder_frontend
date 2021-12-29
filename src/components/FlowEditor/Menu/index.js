import React from "react";
import NavMenus from "./NavMenu"
import PanelContextMenu from "./ContextMenu/PanelContext";
import MultiSelectionContextMenu from "./ContextMenu/MultiselectionContext";
import ElementContextMenu from "./ContextMenu/ElementContext";
import GroupBar from "./GroupBar";
const AppMenu = () => {
  return (
    <>
      <NavMenus/>
      <PanelContextMenu/>
      <MultiSelectionContextMenu />
      <ElementContextMenu />
      <GroupBar />
    </>
  );
}

export default React.memo(AppMenu);
