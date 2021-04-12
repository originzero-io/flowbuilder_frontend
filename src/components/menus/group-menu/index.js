import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../element-context/style";
//import { Container, AddButton,Button,Input,ColorBox,AddGroupWrapper } from "./style";
import { useSelector, useDispatch } from "react-redux";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import {
  addGroup,
  deleteGroup,
  addNodeToGroup,
} from "../../../REDUX/actions/nodeGroupsActions";
import uuid from "react-uuid";
import NodeGod from "../../nodes/NodeGod";
import { setElements } from "../../../REDUX/actions/flowActions";
import styled from "styled-components";
import { ColorBox, Label } from "../group-bar/style";
const Container = styled.div`
  position:absolute;
  right: -110px;
  top: -2px;
  min-width: 100px;
`
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
  padding: 2px;
  &:hover{
    background: #273c75;
  }
`;
const Content = styled.div`
  background: rgba(43,46,53,0.6);
  margin-top: 2px;
`;
export default function GroupMenu() {
  const { groupMenu } = useSelector((state) => state.menuConfigReducer);
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { clickedElement } = useSelector((state) => state.flowConfigReducer);
  const dispatch = useDispatch();
  const [searched, setSearched] = useState([]);
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = nodeGroups.filter((group) => group.name.toLowerCase().includes(value.toLowerCase()));
    if (value === "") {
      setSearched([]);
    } else {
      setSearched(filtered);
    }
  };
  const selectGroup = (group) => {
    const newElements = elements.map((els) => {
      if (els.id === clickedElement.id) {
        return {
          ...els,
          data: {
            ...els.data,
            group,
          },
        };
      }
      return els;
    });
    dispatch(setElements(newElements));
  };
  useEffect(() => {
    setSearched(nodeGroups);
  }, [nodeGroups]);
  useEffect(() => {
    setSearched([]);
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
            <GroupItem onClick={() => selectGroup(group)}>
              <Label>{group.name}</Label>
              <ColorBox color={group.color} />
            </GroupItem>
          );
        })}
      </Content>
    </Container>
  );
}
