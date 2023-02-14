import React from "react";
import { Background, MiniMap } from "reactflow";
import PropTypes from "prop-types";
import KeyboardEvents from "components/Shared/KeyboardEvents";
import FlowEditorMenus from "./Menu/FlowEditorMenus";
import AppTooltips from "../../../AppTooltips";

const propTypes = {
  theme: PropTypes.string.isRequired,
  miniMapDisplay: PropTypes.string.isRequired,
  currentZoom: PropTypes.number,
};

const FlowComponents = ({ theme, miniMapDisplay }) => (
  <>
    <FlowEditorMenus />
    <Background
      variant="dots"
      color={theme === "light" ? "#7f8c8d" : "rgb(170,170,170)"}
    />
    <MiniMap
      nodeColor="gray"
      maskColor="rgba(189, 195, 199,0.5)"
      style={{
        visibility: miniMapDisplay,
        background: "rgba(53, 59, 72,0.8)",
        borderRadius: "4px",
      }}
    />
    <KeyboardEvents />
    <AppTooltips />
  </>
);

export default React.memo(FlowComponents);

FlowComponents.propTypes = propTypes;
