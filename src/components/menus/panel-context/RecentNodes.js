import React, { useEffect, useState } from "react";
import { NodeWrapper, NodeElement } from "./style";
import Icon from "../../nodes/global/NodeIcon";
import { Label } from "../../nodes/styles";
import { FavoriteIcon } from "../../global/SvgIcons";
import sortBy from "lodash/sortBy"
export default function RecentNodes({ nodeList, favClick, onDragStart }) {
  const recent = nodeList.filter((node) => node.createdDate !== undefined);
  const [recentNodes,setRecentNodes] = useState([])
  useEffect(() => {
    const sortByDate = sortBy(recent, 'createdDate').reverse().slice(0,3);
    setRecentNodes(sortByDate);
  },[recent])
  return (
    <>
      <NodeWrapper>
        {recentNodes.map((node) => {
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
        })}
      </NodeWrapper>
    </>
  );
}
