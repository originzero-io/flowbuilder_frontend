import React from "react";
import NavMenus from "./NavMenu"
import PanelContextMenu from "./ContextMenu/PanelContext/PanelContextMenu";
import MultiSelectionContextMenu from "./ContextMenu/MultiselectionContext/MultiSelectionContextMenu";
import ElementContextMenu from "./ContextMenu/ElementContext/ElementContextMenu";
import GroupBar from "./GroupBar/GroupBar";
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
