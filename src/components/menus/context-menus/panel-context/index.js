import React, { useState } from "react";
import * as themeColor from "../../../../config/ThemeReference";
import { Container } from "./style";
import { useSelector,useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import {addNodeToFavorites} from "../../../../REDUX/actions/nodeListActions"
import RecentNodes from "./RecentNodes";
import uuid from "react-uuid";
import { loadFunctionsToNode } from "../../../../app-global/helpers/loadFunctionsToNode";
import { addNewNode } from "../../../../REDUX/actions/elementsActions";

const PanelContextMenu = () => {
  const { panelMenu } = useSelector((state) => state.menuConfigReducer);
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const { rotateAllPath } = useSelector((state) => state.flowConfigReducer);

  const dispatch = useDispatch();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const favClick = (node) => {
    dispatch(addNodeToFavorites(node))
  };
  const addNewNodeHandle = (node) => {
    const nodeFunction = loadFunctionsToNode(node.type, nodeClass);
    const position = { x: panelMenu.x - 300, y: panelMenu.y };
    const newNode = {
      id: uuid(),
      type: node.type,
      position,
      data: {
        label: `${node.name}`,
        onChange: nodeFunction,
        targetCount: 1,
        sourceCount: 1,
        align: rotateAllPath,
        expand: false,
        enable: true,
        group: {nodes:[]},
      },
    };
    dispatch(addNewNode(newNode));
  }
  return (
    <>
      {panelMenu.state === true && (
        <Container x={panelMenu.x} y={panelMenu.y} theme={theme}>
          <Tabs
            selectedTabClassName="selected-tab"
            style={{color:theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}}
          >
            <TabList>
              <Tab style={{userSelect:"none"}}>All</Tab>
              <Tab style={{userSelect:"none"}}>Favorites</Tab>
              <Tab style={{userSelect:"none"}}>Recent</Tab>
            </TabList>
            <TabPanel>
              <AllNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle}/>
            </TabPanel>
            <TabPanel>
              <FavoriteNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle}/>
            </TabPanel>
            <TabPanel>
              <RecentNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle}/>
            </TabPanel>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default PanelContextMenu;
