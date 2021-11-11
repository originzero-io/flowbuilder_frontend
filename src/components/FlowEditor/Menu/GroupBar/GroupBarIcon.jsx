import React,{useState,useEffect} from "react";
import { Container } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setGroupBarDisplay } from "../../../../store/actions/flowActions";
import { GroupIcon } from "../../../Global/icons";
import { getGroupsService } from "../../../../services/groupService";
import { getGroups } from "../../../../store/actions/groupActions";
import { useParams } from "react-router";
export default function GroupBarIcon({theme}) {
  const { flowGui } = useSelector((state) => state.activeFlow);
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
