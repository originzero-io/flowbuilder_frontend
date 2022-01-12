import React from "react";
import useFlow from "../../../../utils/useFlow";
import Panel from ".";
export default function AllFlowsPanel() {
  const flows = useFlow();
  return <Panel flows={flows} />;
}
