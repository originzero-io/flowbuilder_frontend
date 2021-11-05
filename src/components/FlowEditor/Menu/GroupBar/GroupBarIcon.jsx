import React,{useState,useEffect} from "react";
import { Container } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setGroupBarDisplay } from "../../../../store/actions/flowActions";
import { GroupIcon } from "../../../Global/icons";
export default function GroupBarIcon({theme}) {
  const { flowWorkspace } = useSelector((state) => state.activeFlow);
  const dispatch = useDispatch();
  const { groupBarDisplay } = flowWorkspace;
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
    } else dispatch(setGroupBarDisplay("visible"));
  };
  return (
    <Container onClick={groupBarDisplayHandle} theme={theme}>
      <GroupIcon width="50px" height="50px" color="whitesmoke" theme={theme}/>
    </Container>
  );
}
