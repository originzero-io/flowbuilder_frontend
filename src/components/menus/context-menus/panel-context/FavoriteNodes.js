import React from "react";
import { NodeWrapper } from "./style";
import NodeListItem from "./NodeListItem";
export default function FavoriteNodes({ nodeList,favClick,onDragStart, addNewNode }) {
  const favoriteNodes = nodeList.filter((node) => node.fav === true);
  return (
    <>
      <NodeWrapper>
        {favoriteNodes.length > 0 ? favoriteNodes.map((node) => {
          return (
            <NodeListItem
              node={node}
              onDragStart={onDragStart}
              addNewNode={addNewNode}
              favClick={favClick}
            />
          );
        }) : "Click the star button to fav nodes"}
      </NodeWrapper>
    </>
  );
}
