import React from "react";
import { Background, MiniMap } from "reactflow";
import PropTypes from "prop-types";
import KeyboardEvents from "./KeyboardEvents";
import FlowEditorMenus from "./Menu/FlowEditorMenus";

const propTypes = {
  theme: PropTypes.string.isRequired,
  miniMapDisplay: PropTypes.string.isRequired,
  currentZoom: PropTypes.number,
};

const Utils = ({ flowGui }) => {
  return (
    <>
      <FlowEditorMenus />
      <Background
        variant="dots"
        // gap={25}
        size={1}
        // color={
        //   flowGui.theme === "rgba(53, 59, 72,0.8)" ? "red" : "rgb(170,170,170)"
        // }
        color="rgba(100,100,100,0.8)"
      />
      <MiniMap
        nodeColor="gray"
        maskColor="rgba(189, 195, 199,0.5)"
        style={{
          visibility: flowGui.miniMapDisplay,
          background: "rgba(53, 59, 72,0.8)",
          borderRadius: "4px",
        }}
      />
      <KeyboardEvents />
    </>
  );
};

export default React.memo(Utils);

Utils.propTypes = propTypes;
