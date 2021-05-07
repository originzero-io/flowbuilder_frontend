import React from "react";
import { NodeWrapper, NodeElement } from "./style";
import { Label } from "../../../nodes/styles";
import FavIconManager from "./FavIconManager";
export default function FavoriteNodes({ nodeList,favClick,onDragStart }) {
  const favoriteNodes = nodeList.filter((node) => node.fav === true);
  return (
    <>
      <NodeWrapper>
        {favoriteNodes.length > 0 ? favoriteNodes.map((node) => {
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
        }) : "Click the star button to fav nodes"}
      </NodeWrapper>
    </>
  );
}
