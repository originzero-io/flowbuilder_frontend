import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setGroupToNodes } from "../../../helpers/elementController";
import { setGroupMultiple, setGroupSingle } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "hooks/useActiveFlow";
import { GroupColor, Label } from "../GroupBar/GroupBar.style";
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
export default function GroupMenu({ self }) {
  const { flowElements,flowGroups } = useActiveFlow();
  const elements = flowElements.present;
  const dispatch = useDispatch();
  const selectedElements = useStoreState((state) => state.selectedElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    setSearched(flowGroups);
  }, [flowGroups]);
  useEffect(() => {
    setSearched(flowGroups);
  }, []);
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = flowGroups.filter((group) =>
      group.name.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      setSearched([]);
    } else {
      setSearched(filtered);
    }
  };
  const selectGroup = (group) => {
    if (selectedElements.length > 1) {
      multiSelectionHandle(group);
    } else {
      singleSelectionHandle(group);
    }
  };

  const singleSelectionHandle = (group) => {
    dispatch(setGroupSingle(self, group));
  };

  const multiSelectionHandle = (group) => {
    const selectedElementIds = selectedElements.map(m => m.id)
    dispatch(setGroupMultiple(selectedElementIds, group));
    const newElements = setGroupToNodes(selectedElementIds, elements, group);
    const newSelected = newElements.filter(els=>selectedElementIds.includes(els.id))
    setSelectedElements(newSelected);
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
            <GroupItem key={group._id} onClick={() => selectGroup(group)}>
              <Label style={{ fontSize: "12px" }}>{group.name}</Label>
              <GroupColor width="15px" height="15px" value={group.color} />
            </GroupItem>
          );
        })}
      </Content>
    </Container>
  );
}
