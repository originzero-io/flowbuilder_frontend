import React, { useEffect, useState } from "react";
import { NodeWrapper, NodeElement } from "./style";
import { Label } from "../../nodes/styles";
import sortBy from "lodash/sortBy"
import FavIconManager from "./FavIconManager";
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
