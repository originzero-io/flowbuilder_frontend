import React from "react";
import {useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setElements } from "../../../REDUX/actions/flowActions";
import { updateGroup } from "../../../REDUX/actions/nodeGroupsActions";
import { ColorFlag } from "./style";
import { useStoreActions, isNode } from "react-flow-renderer";

const Form = styled.form`
  margin: 0 10px 0 10px;
  display: flex;
  justify-content: flex-end;
  background: gray;
`;
const Input = styled.input`
  width: 30%;
  font-size: 8px;
`;
const Submit = styled.input`
  font-size: 8px;
  background: transparent;
  border: none;
`;
export default function EditForm({clickedItem,setClickedItem}) {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer);
  const onSubmitHandle = (event) => {
    event.preventDefault();
    console.log(clickedItem);
    dispatch(updateGroup(clickedItem));
    const newArray = elements.map((els) => {
      if (els.data.group.name === clickedItem.name) {
        return {
          ...els,
          data: {
            ...els.data,
            group: { name: clickedItem.name, color: clickedItem.color },
          },
        };
      } else {
        return els;
      }
    });
    dispatch(setElements(newArray));
    };
    const updateChangeHandle = (event) => {
        const { name, value } = event.target;
        setClickedItem({
          ...clickedItem,
          [name]: value,
        });
  };
  
  return (
    <>
      <Form onSubmit={onSubmitHandle}>
        <Submit type="submit" value="Edit" />
        <Input
          name="name"
          value={clickedItem.name}
          onChange={updateChangeHandle}
        />
        <ColorFlag
          name="color"
          type="color"
          value={clickedItem.color}
          onChange={updateChangeHandle}
        />
      </Form>
    </>
  );
}
