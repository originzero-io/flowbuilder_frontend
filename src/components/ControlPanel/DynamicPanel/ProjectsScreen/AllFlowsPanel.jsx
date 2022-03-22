import React from "react";
import useFlow from "hooks/useFlow";
import Panel from "./ProjectsScreen";
export default function AllFlowsPanel() {
  const flows = useFlow();
  return <Panel flows={flows} />;
}
