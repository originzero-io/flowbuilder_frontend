import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  updateGroup,
} from "../../../REDUX/actions/nodeGroupsActions";
import { setElements } from "../../../REDUX/actions/flowActions";
import { DeleteButton, ColorFlag, GroupItem, Label } from "./style";
import styled from "styled-components";
import { useStoreActions } from "react-flow-renderer";
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
const NonGroups = styled.button`
  background: transparent;
  border: 1px solid orange;
  padding: 3px;
  width: 100%;
  font-size: 10px;
  color: whitesmoke;
  &:hover {
    background: orange;
  }
`;
const ItemButton = styled.div`
  border: 1px solid whitesmoke;
  border-radius: 4px;
  font-size: 8px;
  padding: 2px;
  &:hover {
    background-color: #e67e22;
    border-color: #e67e22;
  }
`;

export default function GroupList({ theme }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [hover, setHover] = useState({});
  const [clickedItem, setClickedItem] = useState({ state: false });
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const deleteGroupHandle = (groupId) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroup(groupId));
      const newArray = elements.map((els) => {
        if (els.data.group.id === groupId) {
          return {
            ...els,
            data: {
              ...els.data,
              group: {},
            },
          };
        } else {
          return els;
        }
      });
      dispatch(setElements(newArray));
    }
  };
  const groupItemClickHandle = (group) => {
    if (clickedItem.state === true) {
      setClickedItem({ state: false, ...group });
    } else setClickedItem({ state: true, ...group });
  };
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
  const selectItems = (nodes) => {
    setSelectedElements(nodes);
  };
  const selectNonGroupsHandle = () => {
    const nonGroups = elements.filter((els) => els.data.group.id === undefined);
    setSelectedElements(nonGroups);
  };
  return (
    <>
      <>
        {nodeGroups.map((group) => {
          return (
            <>
              <GroupItem
                key={group.id}
                theme={theme}
                onMouseEnter={() => setHover(group.id)}
                onMouseLeave={() => setHover(null)}
              >
                <DeleteButton onClick={() => deleteGroupHandle(group.id)}>
                  X
                </DeleteButton>
                <Label>{group.name}</Label>
                {hover === group.id && (
                  <>
                    <ItemButton onClick={() => selectItems(group.nodes)}>
                      select
                    </ItemButton>
                    <ItemButton onClick={() => groupItemClickHandle(group)}>
                      edit
                    </ItemButton>
                    {/* <div onClick={() => groupItemClickHandle(group)}>
                      <i className="fas fa-edit"></i>
                    </div> */}
                  </>
                )}
                <ColorFlag type="color" value={group.color} />
              </GroupItem>
              {clickedItem.id === group.id && clickedItem.state && (
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
              )}
            </>
          );
        })}
      </>
      <NonGroups onClick={selectNonGroupsHandle}>Non-Groups</NonGroups>
    </>
  );
}
