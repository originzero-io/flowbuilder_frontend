import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../element-context/style";
//import { Container, AddButton,Button,Input,ColorBox,AddGroupWrapper } from "./style";
import { useSelector, useDispatch } from "react-redux";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import {
  addGroup,
  deleteGroup,
  addNodeToGroup,
  deleteNodeCurrentGroup,
} from "../../../REDUX/actions/nodeGroupsActions";
import uuid from "react-uuid";
import { setElements } from "../../../REDUX/actions/flowActions";
import { updateGroup } from "../../../REDUX/actions/nodeGroupsActions";
import styled from "styled-components";
import { GroupColor, Label } from "../group-bar/style";
import { isEdge, isNode } from "react-flow-renderer";
const Container = styled.div`
  position: absolute;
  right: -110px;
  top: -2px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const SearchBar = styled.input`
  border-radius: 4px;
  width: 70%;
  padding-left: 3px;
  background-color: transparent;
  border: 1px solid #636e72;
  color: whitesmoke;
  caret-color: green;
  user-select: none;
  &:focus {
  }
  font-size: 8px;
  outline: hidden;
`;
const GroupItem = styled.div`
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
  &:hover {
    background: rgb(15, 175, 143);
  }
`;
const Content = styled.div`
  background: rgba(43, 46, 53, 0.6);
  margin-top: 2px;
`;
export default function GroupMenu({ self, multiSelection }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [searched, setSearched] = useState([]);
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = nodeGroups.filter((group) =>
      group.name.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      setSearched([]);
    } else {
      setSearched(filtered);
    }
  };
  const selectGroup = (group) => {
    if (multiSelection) {
      multiSelectionHandle(group);
    } else {
      singleSelectionHandle(group);
    }
  };

  const singleSelectionHandle = (group) => {
    const newElements = elements.map((els) => {
      if (isNode(els)) {
        if (els.id === self.id) {
          return {
            ...els,
            data: {
              ...els.data,
              group,
            },
          };
        }
        return els;
      }
      if (isEdge(els)) {
        if (els.source === self.id) {
          return {
            ...els,
            style: {
              ...els.style,
              stroke: group.color,
            },
          };
        }
        return els;
      }
    });
    dispatch(setElements(newElements));
    dispatch(deleteNodeCurrentGroup(self));
    dispatch(addNodeToGroup(self, group));
  };

  const multiSelectionHandle = (group) => {
    console.log("group:", group);
    console.log("multi-selection-array", multiSelection);
  };
  useEffect(() => {
    setSearched(nodeGroups);
  }, [nodeGroups]);
  useEffect(() => {
    setSearched(nodeGroups);
  }, []);
  return (
    <Container>
      <SearchBar
        placeholder="search group"
        className="nodrag nowheel"
        onChange={searchHandle}
      />
      <Content>
        {searched.map((group) => {
          return (
            <GroupItem key={group.id} onClick={() => selectGroup(group)}>
              <Label style={{ fontSize: "12px" }}>{group.name}</Label>
              <GroupColor width="15px" height="15px" value={group.color} />
            </GroupItem>
          );
        })}
      </Content>
    </Container>
  );
}
