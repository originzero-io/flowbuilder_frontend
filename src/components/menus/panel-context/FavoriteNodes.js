import React from "react";
import { NodeWrapper, NodeElement } from "./style";
import Icon from "../../global/Icon";
import { Label } from "../../nodes/styles";
import { FavoriteIcon } from "../../icon-components/SvgIcons";

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
                width={"25px"}
                height={"25px"}
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
