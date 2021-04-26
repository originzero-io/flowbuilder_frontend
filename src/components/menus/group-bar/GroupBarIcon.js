import React,{useState,useEffect} from "react";
import { Container } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setGroupBarDisplay } from "../../../REDUX/actions/flowActions";
import { GroupIcon } from "../../global/SvgIcons";
export default function GroupBarIcon({theme}) {
  const { groupBarDisplay } = useSelector((state) => state.flowConfigReducer);
  const dispatch = useDispatch();
  
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
    } else dispatch(setGroupBarDisplay("visible"));
  };
  return (
    <Container onClick={groupBarDisplayHandle}>
      <GroupIcon width="60px" height="60px" color="whitesmoke" theme={theme}/>
    </Container>
  );
}
