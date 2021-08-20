import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { openFlow, deleteFlow } from "../../../../store/actions/flowActions";
import Card from "../../../Global/Card/Card";

const FlowList = ()=> {
  const dispatch = useDispatch();
  const history = useHistory();
  const flows = useSelector((state) => state.flowReducer);
  const { activeTeam } = useSelector((state) => state.teamReducer);
  const { activeProject } = useSelector((state) => state.projectReducer);
  const [teamFlow, setTeamFlow] = useState([]);
  console.log("Flow list:", flows);
  const openPageHandler = (data) => {
    //dispatch(openFlow(data.config));
    history.push(`/flow/${data._id}`);
  };
  return (
    <>
      {flows.map((flow) => {
        return (
          <div key={flow._id} onClick={() => openPageHandler(flow)}>
            <Card key={flow._id} data={flow}/>
          </div>
        );
      })}
    </>
  );
}
export default React.memo(FlowList);