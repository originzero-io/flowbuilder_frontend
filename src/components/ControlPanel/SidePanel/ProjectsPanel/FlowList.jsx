import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { openFlow, deleteFlow } from "../../../../store/actions/flowActions";
import Card from "../../../global/Card/Card";

export default function FlowList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const flows = useSelector((state) => state.flowReducer);
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
