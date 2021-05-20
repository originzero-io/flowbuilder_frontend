import React, { useEffect, useState } from "react";
//import { Container, AddButton,Button,Input,ColorBox,AddGroupWrapper } from "./style";
import { useSelector, useDispatch } from "react-redux";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import {
  addGroup,
  deleteGroup,
  addNodeToGroupSingle,
  addNodeToGroupMultiple,
  deleteNodeCurrentGroupSingle,
  deleteNodeCurrentGroupMultiple,
} from "../../../REDUX/actions/nodeGroupsActions";
import { setElements } from "../../../REDUX/actions/elementsActions";
import styled from "styled-components";
import { GroupColor, Label } from "../group-bar/style";
import { isEdge, isNode } from "react-flow-renderer";
const Container = styled.div`
  position: absolute;
  right: -120px;
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
  background-color: rgb(189, 195, 199);
  border: 1px solid #636e72;
  color: black;
  caret-color: green;
  user-select: none;
  font-size: 10px;
  outline: hidden;
`;
const GroupItem = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
  &:hover {
    background: rgb(15, 175, 143);
  }
`;
const Content = styled.div`
  background: rgb(189, 195, 199);
  margin-top: 2px;
`;
export default function GroupMenu({ self, selectedElements }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    setSearched(nodeGroups);
  }, [nodeGroups]);
  useEffect(() => {
    setSearched(nodeGroups);
  }, []);
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
    if (selectedElements) {
      multiSelectionHandle(group);
    } else {
      singleSelectionHandle(group);
    }
  };

  const singleSelectionHandle = (group) => {
    console.log("single")
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
      else if (isEdge(els)) {
        if (els.source === self.id) {
          return {
            ...els,
            group,
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
    dispatch(deleteNodeCurrentGroupSingle(self));
    dispatch(addNodeToGroupSingle(self, group));
  };

  const multiSelectionHandle = (group) => {
    console.log("multi")
    const selectedElementIds = selectedElements.map(m => m.id)
    const newElements = elements.map((els) => {
      if (isNode(els)) {
        if (selectedElementIds.includes(els.id)) {
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
      else if (isEdge(els)) {
        if (selectedElementIds.includes(els.source)) {
          return {
            ...els,
            group,
            style: {
              ...els.style,
              stroke: group.color,
            },
          };
        }
        return els;
      }
    });
    console.log("selected ids:", selectedElementIds);
    console.log("group", group);

    const newGroups = nodeGroups.map((gr) => {
      if (gr.id === group.id) {
        return {
          ...gr,
          nodes: gr.nodes.filter((node) => !selectedElementIds.includes(node.id)),
        };
      }
      return gr;
    });

    console.table(newGroups)

    

    dispatch(setElements(newElements));
    dispatch(deleteNodeCurrentGroupMultiple(selectedElementIds,selectedElements[0].data.group));
    dispatch(addNodeToGroupMultiple(selectedElements, group));
  };
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
