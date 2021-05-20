import React, { useState, useEffect } from "react";
import { NodeWrapper } from "./style";
import styled from "styled-components";
import NodeListItem from "./NodeListItem";

const SearchBar = styled.input`
  border-radius: 4px;
  width: 100%;
  padding-left: 6px;
  opacity: 1;
  background-color: transparent;
  border: 1px solid #636e72;
  color: whitesmoke;
  caret-color: green;
  user-select: none;
  &:focus {
  }
`;
export default function AllNodes({
  nodeList,
  favClick,
  onDragStart,
  addNewNode,
}) {
  const [searched, setSearched] = useState(nodeList);
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = nodeList.filter((node) =>
      node.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(nodeList);
  }, [nodeList]);

  return (
    <>
      <NodeWrapper>
        <SearchBar placeholder="search" onChange={searchHandle} />
        {searched.map((node) => {
          return (
            <NodeListItem
              key={node.id}
              node={node}
              onDragStart={onDragStart}
              addNewNode={addNewNode}
              favClick={favClick}
            />
          );
        })}
      </NodeWrapper>
    </>
  );
}
