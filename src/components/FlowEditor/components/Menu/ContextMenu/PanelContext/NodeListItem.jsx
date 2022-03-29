import React from "react";
import { NodeElement,IconWrapper,Label } from "./PanelContextMenu.style";
import FavIconManager from "./FavIconManager";
import PropTypes from "prop-types"

const propTypes = {
  node: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  addNewNode: PropTypes.func.isRequired,
  favClick: PropTypes.func.isRequired
}
export default function NodeListItem({ node, onDragStart, addNewNode, favClick }) {
  return (
    <NodeElement
      onDragStart={(event) => onDragStart(event, node.name)}
      onDoubleClick={() => addNewNode(node)}
      draggable
    >
      <div style={{display:'flex',alignItems:'center'}}>
        <>{node.icon}</>
        <Label>{node.name}</Label>
      </div>
      <IconWrapper>
        <div onClick={() => addNewNode(node)} >
          <i className="fas fa-plus" style={{width:'15px',height:'15px'}}></i>
        </div>
        <FavIconManager node={node} favClick={favClick} />
      </IconWrapper>
    </NodeElement>
  );
}

NodeListItem.propTypes = propTypes;