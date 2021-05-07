import React, { useState, useEffect } from "react";
import { NodeWrapper, NodeElement, Container } from "./style";
import { Label } from "../../../nodes/styles";
import styled from "styled-components";
import FavIconManager from "./FavIconManager";
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
export default function AllNodes({ nodeList, favClick, onDragStart }) {
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
  //const IconComponent = node.icon;
  return (
    <>
      <NodeWrapper>
        <SearchBar placeholder="search" onChange={searchHandle} />
        {searched.map((node) => {
          return (
            <NodeElement
              key={node.id}
              onDragStart={(event) => onDragStart(event, node.name)}
              draggable
            >
              <>{node.icon}</>
              <Label>{node.name}</Label>
              <FavIconManager node={node} favClick={favClick}/>
            </NodeElement>
          );
        })}
      </NodeWrapper>
    </>
  );
}
