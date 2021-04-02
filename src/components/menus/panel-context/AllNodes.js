import React, { useState, useEffect } from "react";
import { NodeWrapper, NodeElement, Container } from "./style";
import { useDispatch,useSelector } from "react-redux";
import Icon from "../../global/Icon";
import FavIcon from "../../style-components/FavIcon";
import { Label } from "../../nodes/styles";
import styled from "styled-components";
import { addFav } from "../../../REDUX/actions/nodeListActions";
import { FavoriteIcon } from "../../icon-components/SvgIcons";
const SearchBar = styled.input`
  border-radius: 4px;
  border: none;
  width: 100%;
  padding-left: 6px;
  opacity: 1;
  background-color: transparent;
  border: 1px solid #636e72;
  color: whitesmoke;
  caret-color: green;
  user-select:none;
  &:focus {
  }
`;
export default function AllNodes({ nodeList, favClick, onDragStart }) {
  const [searched, setSearched] = useState(nodeList);
  const flagColor = useSelector((state)=>state.flagColorReducer)
  const dispatch = useDispatch();
  const searchHandle = (e) => {
    const value = e.target.value;
    const filtered = nodeList.filter((node) => node.name.includes(value));
    setSearched(filtered);
  };
  useEffect(() => {
    setSearched(nodeList);
  }, [nodeList]);
  return (
    <>
      <NodeWrapper>
        <SearchBar placeholder="search" onChange={searchHandle}/>
        {searched.map((node) => {
          return (
            <NodeElement
              key={node.id}
              onDragStart={(event) => onDragStart(event, node.name)}
              draggable
            >
              <Icon src={node.icon} width={"40vmin"} height={"40vmin"} />
              <Label>{node.name}</Label>
              <FavoriteIcon
                width={"25px"}
                height={"25px"}
                favClick={favClick}
                nodeId={node.id}
                color={node.fav === true ? "rgb(218,168,0)" : "rgb(30,30,30)"}
                draggable={false}
              />
            </NodeElement>
          );
        })}
      </NodeWrapper>
    </>
  );
}
