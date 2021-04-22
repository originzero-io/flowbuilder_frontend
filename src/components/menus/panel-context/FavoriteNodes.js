import React from "react";
import { NodeWrapper, NodeElement } from "./style";
import Icon from "../../nodes/global/NodeIcon";
import { Label } from "../../nodes/styles";
import { FavoriteIcon } from "../../global/SvgIcons";

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
              <Icon src={node.icon} width={"40vmin"} height={"40vmin"} />
              <Label>{node.name}</Label>
              <FavoriteIcon
                favClick={favClick}
                nodeId={node.id}
                color={node.fav === true ? "rgb(218,168,0)" : "rgb(30,30,30)"}
              />
            </NodeElement>
          );
        }) : "Click the star button to fav nodes"}
      </NodeWrapper>
    </>
  );
}
