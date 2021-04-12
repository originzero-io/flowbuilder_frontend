import React,{useState,useEffect} from "react";
import { Container } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { setGroupBarDisplay } from "../../../REDUX/actions/flowActions";
export default function GroupBarIcon() {
  const { groupBarDisplay } = useSelector((state) => state.flowConfigReducer);  const dispatch = useDispatch();
  const groupBarDisplayHandle = () => {
    if (groupBarDisplay === "visible") {
      dispatch(setGroupBarDisplay("hidden"));
    } else dispatch(setGroupBarDisplay("visible"));
  };
  return (
    <Container onClick={groupBarDisplayHandle}>
      <i className={`fas fa-arrow-circle-left`}></i> 
    </Container>
  );
}
