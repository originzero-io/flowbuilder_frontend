import React from "react";
import MainMenu from "./nav-menus/MainMenu";
import UtilitiesMenu from "./nav-menus/UtilitiesMenu";
import ConfigurationMenu from "./nav-menus/ConfigurationMenu";
import PanelContextMenu from "./panel-context/PanelContextMenu";
import MultiSelectionContextMenu from "./multiselection-context/MultiSelectionContextMenu";
import ElementContextMenu from "./element-context/ElementContextMenu";
export default function AppMenu() {
  return (
    <>
      <MainMenu/>
      <ConfigurationMenu/>
      <UtilitiesMenu/>
      <PanelContextMenu />
      <MultiSelectionContextMenu />
      <ElementContextMenu/>
    </>
  );
}
