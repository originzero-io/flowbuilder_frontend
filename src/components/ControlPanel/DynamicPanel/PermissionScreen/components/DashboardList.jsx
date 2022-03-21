import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckboxGroup from "../../../../Shared/SwitchInput/CheckboxGroup";
import Checkbox from "../../../../Shared/SwitchInput/Checkbox";
import { CollapsibleMenuItem } from "./CollapsibleMenu";

function DashboardList({ project}) {
  const [dashboards, setDashboards] = useState([]);
  return (
    <>
      {dashboards.length > 0 ? (
        <>
          <CollapsibleMenuItem>
            <CheckboxGroup label="All">
              <Checkbox name="processorCreate" />
            </CheckboxGroup>
          </CollapsibleMenuItem>
          {dashboards.map((flow) => {
            return (
              <CollapsibleMenuItem key={flow._id}>
                <CheckboxGroup label={flow.config.name}>
                  <Checkbox name="processorCreate" />
                </CheckboxGroup>
              </CollapsibleMenuItem>
            );
          })}
        </>
      ) : <div style={{paddingLeft:'10px',fontSize:'1.3vmin'}}>No dashboard in this project</div>}
    </>
  );
}

DashboardList.propTypes = {
  project: PropTypes.object.required
};

export default DashboardList;
