import React, { useEffect, useState } from "react";
import { NodeWrapper, NodeElement } from "./style";
import Icon from "../../global/Icon";
import { Label } from "../../nodes/styles";
import { useSelector,useDispatch } from "react-redux";
import { FavoriteIcon } from "../../icon-components/SvgIcons";
import {setNodeList} from "../../../REDUX/actions/nodeListActions"
import _ from "lodash"
export default function RecentNodes({ nodeList, favClick, onDragStart }) {
  const recent = nodeList.filter((node) => node.recent === true);
  const [recentNodes,setRecentNodes] = useState([])
  useEffect(() => {
    const sortByDate = _.sortBy(recent, 'date').reverse().slice(0,3);
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
