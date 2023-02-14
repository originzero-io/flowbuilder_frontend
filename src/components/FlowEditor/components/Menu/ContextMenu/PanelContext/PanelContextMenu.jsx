import React, { useEffect } from "react";
import * as themeColor from "constants/ThemeReference";
import { useSelector, useDispatch } from "react-redux";
import {
  Tabs, Tab, TabList, TabPanel,
} from "react-tabs";
import { addNodeToFavorites, setNodeList } from "store/reducers/nodeListSlice";
import { addNewNode } from "store/reducers/flow/flowElementsSlice";
import useActiveFlow from "hooks/useActiveFlow";
import { useReactFlow } from "reactflow";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import RecentNodes from "./RecentNodes";
import { createNode } from "../../../../helpers/elementHelper";
import { Container } from "./PanelContextMenu.style";

const PanelContextMenu = () => {
  const { panelMenu } = useSelector((state) => state.menus);
  const { flowGui } = useActiveFlow();
  const { rotateAllPath, theme } = flowGui;
  const nodeList = useSelector((state) => state.nodeList);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const dispatch = useDispatch();

  const reactFlowInstance = useReactFlow();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const favClick = (node) => {
    dispatch(addNodeToFavorites(node));
  };
  const addNewNodeHandle = (node) => {
    const position = reactFlowInstance.project({
      x: panelMenu.x - 200,
      y: panelMenu.y,
    });
    const newNode = createNode(node.type, position, rotateAllPath, nodeClass);
    dispatch(addNewNode(newNode));
  };
  return (
    <>
      {panelMenu.state && (
        <Container x={panelMenu.x} y={panelMenu.y} theme={theme}>
          <Tabs
            selectedTabClassName="selected-tab"
            style={{ color: theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON }}
          >
            <TabList style={{ position: 'sticky', top: '0', zIndex: '6' }}>
              <Tab>All</Tab>
              <Tab>Favorites</Tab>
              <Tab>Recent</Tab>
            </TabList>
            <TabPanel>
              <AllNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle} />
            </TabPanel>
            <TabPanel>
              <FavoriteNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle} />
            </TabPanel>
            <TabPanel>
              <RecentNodes nodeList={nodeList} favClick={favClick} onDragStart={onDragStart} addNewNode={addNewNodeHandle} />
            </TabPanel>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default PanelContextMenu;
