import React from "react";
import Panel from ".";
import useFlow from "../../../../utils/useFlow";
import useProject from "../../../../utils/useProject";
export default function FlowsByProjectPanel() {
  const { activeProject } = useProject();
  const flows = useFlow().filter(
    (flow) => flow.project._id === activeProject._id
  );
  return <Panel flows={flows} />;
}
