import React from "react";
import ConfigurationMenu from "./ConfigurationMenu";
import MainMenu from "./MainMenu";
import ControlMenu from "./ControlMenu";
export default function NavMenu() {
  return (
    <>
      <MainMenu />
      <ConfigurationMenu />
      <ControlMenu />
    </>
  );
}
