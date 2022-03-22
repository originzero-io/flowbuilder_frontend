import React from "react";
import Panel from "./ProjectsScreen";
import useFlow from "hooks/useFlow";
import useProject from "hooks/useProject";
export default function FlowsByProjectPanel() {
  const { activeProject } = useProject();
  const flows = useFlow().filter(
    (flow) => flow.project._id === activeProject._id
  );
  return <Panel flows={flows} />;
}
