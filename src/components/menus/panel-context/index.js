import React, { useCallback, useState, useContext } from "react";
import * as types from "../../nodes/constant/nodeTypes";
import { NodeWrapper, NodeElement, Container } from "./style";
import { useSelector,useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import {setNodeList} from "../../../REDUX/actions/nodeListActions"
import RecentNodes from "./RecentNodes";
const PanelContextMenu = () => {
  const {panelMenu} = useSelector((state) => state.menuConfigReducer);
  const {theme} = useSelector((state) => state.guiConfigReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const dispatch = useDispatch();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const favClick = (id) => {
    const newList = nodeList.map(node => {
      if (node.id === id) {
        return {
          ...node,
          fav:!node.fav
        }
      }
      else {
        return node;
      }
    })
    dispatch(setNodeList(newList))
  };
  return (
    <>
      {panelMenu.state === true && (
        <Container x={panelMenu.x} y={panelMenu.y} theme={theme}>
          <Tabs
            selectedTabClassName="selected-tab"
            style={{color:theme === "dark" ? "#dcdcdc" : "black"}}
          >
            <TabList>
              <Tab style={{userSelect:"none"}}>All</Tab>
              <Tab style={{userSelect:"none"}}>Favorites</Tab>
              <Tab style={{userSelect:"none"}}>Recent</Tab>
            </TabList>
            <TabPanel>
              <AllNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart}/>
            </TabPanel>
            <TabPanel>
              <FavoriteNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart}/>
            </TabPanel>
            <TabPanel>
              <RecentNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart}/>
            </TabPanel>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default PanelContextMenu;
