import React from "react";
import { Background, Controls, MiniMap } from "react-flow-renderer";
import AppMenu from "./Menu";
import PropTypes from "prop-types"
const FlowComponents = ({ theme, miniMapDisplay }) => {
  return (
    <>
      <AppMenu/>
      <Background
        variant="lines"
        gap={80}
        color={theme === "light" ? "#7f8c8d" : "rgb(170,170,170)"}
        size={theme === "light" ? "0.1px" : "0.1px"}
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
    </>
  );
}

export default React.memo(FlowComponents);

FlowComponents.propTypes = {
  theme: PropTypes.string.isRequired,
  miniMapDisplay: PropTypes.string.isRequired,
}