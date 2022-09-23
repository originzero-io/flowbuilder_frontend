import React from "react";
import NavMenu from "./NavMenu/NavMenu"
import PanelContextMenu from "./ContextMenu/PanelContext/PanelContextMenu";
import MultiSelectionContextMenu from "./ContextMenu/MultiselectionContext/MultiSelectionContextMenu";
import ElementContextMenu from "./ContextMenu/ElementContext/ElementContextMenu";
import GroupBar from "./GroupBar/GroupBar";
const FlowEditorMenus = () => {
  return (
    <>
      <NavMenu/>
      <PanelContextMenu/>
      <MultiSelectionContextMenu />
      <ElementContextMenu />
      <GroupBar />
    </>
  );
}

export default React.memo(FlowEditorMenus);
