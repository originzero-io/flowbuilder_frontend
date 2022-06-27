import React, { useEffect } from "react";
import * as themeColor from "constants/ThemeReference";
import { Container } from "./PanelContextMenu.style";
import { useSelector,useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import {addNodeToFavorites, setNodeList} from "store/reducers/nodeListSlice"
import RecentNodes from "./RecentNodes";
import { loadFunctionsToNode } from "../../../../helpers/loadFunctionsToNode";
import { addNewNode } from "store/reducers/flow/flowElementsSlice";
import { createNode } from "../../../../helpers/elementController";
import useDidMountEffect  from "hooks/useDidMountEffect";
import {loadIconsToNodeList} from "../../../../helpers/loadIconsToNodeList";
import useActiveFlow from "hooks/useActiveFlow";
import { useReactFlow } from "react-flow-renderer";

const PanelContextMenu = () => {
  const { panelMenu } = useSelector((state) => state.menus);
  const { flowGui } = useActiveFlow();
  const { rotateAllPath,theme } = flowGui;
  const nodeList = useSelector((state) => state.nodeList);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const dispatch = useDispatch();

  const reactFlowInstance = useReactFlow();
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const favClick = (node) => {
    dispatch(addNodeToFavorites(node))
  };
  const addNewNodeHandle = (node) => {
    const position = reactFlowInstance.project({
      x: panelMenu.x - 200,
      y: panelMenu.y,
    });
    const newNode = createNode(node.type, position, rotateAllPath, nodeClass);
    dispatch(addNewNode(newNode));
  }
  return (
    <>
      {panelMenu.state && (
        <Container x={panelMenu.x} y={panelMenu.y} theme={theme}>
          <Tabs
            selectedTabClassName="selected-tab"
            style={{color:theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}}
          >
            <TabList style={{position:'sticky',top:'0',zIndex:'6'}}>
              <Tab>All</Tab>
              <Tab>Favorites</Tab>
              <Tab>Recent</Tab>
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
