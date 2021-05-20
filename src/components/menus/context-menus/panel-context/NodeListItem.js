import React from "react";
import { NodeElement,IconWrapper } from "./style";
import { Label } from "../../../nodes/styles";
import FavIconManager from "./FavIconManager";

export default function NodeListItem({node,onDragStart,addNewNode,favClick}) {
  return (
    <NodeElement
      onDragStart={(event) => onDragStart(event, node.name)}
      onDoubleClick={() => addNewNode(node)}
      draggable
    >
      <>{node.icon}</>
      <Label>{node.name}</Label>
      <IconWrapper>
        <div onClick={() => addNewNode(node)} >
          <i className="fas fa-plus" style={{width:'15px',height:'15px'}}></i>
        </div>
        <FavIconManager node={node} favClick={favClick} />
      </IconWrapper>
    </NodeElement>
  );
}
