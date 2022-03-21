import React,{useState,useEffect} from "react";
import { Container } from "./GroupBar.style";
import { useSelector, useDispatch } from "react-redux";
import { setGroupBarDisplay } from "../../../../../store/reducers/flow/flowGuiReducer";
import { GroupIcon } from "../../../../Shared/icons";
import { getGroups } from "../../../../../store/reducers/flow/flowGroupsReducer";
import { useParams } from "react-router";
import useActiveFlow from "../../../../../hooks/useActiveFlow";
export default function GroupBarIcon({theme}) {
  const { flowGui } = useActiveFlow();
  const { flowId } = useParams();
  const dispatch = useDispatch();
  const { groupBarDisplay } = flowGui;
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
    } else {
      dispatch(getGroups(flowId));
      dispatch(setGroupBarDisplay("visible"));
    }
  };
  return (
    <Container onClick={groupBarDisplayHandle} theme={theme}>
      <GroupIcon width="50px" height="50px" color="whitesmoke" theme={theme}/>
    </Container>
  );
}
