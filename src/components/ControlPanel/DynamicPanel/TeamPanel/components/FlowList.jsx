import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFlowsByProjectService } from "../../../../../services/flowService";
import { CollapsibleMenuItem } from "./CollapsibleMenu";
import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";

function FlowList({ project,as:Component }) {
  const [flows, setFlows] = useState([]);
  useEffect(async () => {
    const data = await getFlowsByProjectService(project);
    //console.log("data:", data.flows);
    setFlows(data.flows);
  }, []);
  return (
    <>
      {flows.map((flow) => {
        return (
          <Component key={flow._id}>
            <CheckboxGroup label={flow.config.name}>
              <Checkbox name="processorCreate" size="15px" />
            </CheckboxGroup>
          </Component>
        );
      })}
    </>
  );
}

FlowList.propTypes = {
  project: PropTypes.object.required,
  as:PropTypes.elementType
};

export default FlowList;
