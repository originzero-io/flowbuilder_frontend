import React, { useEffect } from "react";
import * as themeColor from "../../../../../config/ThemeReference";
import { Container } from "./style";
import { useSelector,useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import {addNodeToFavorites, setNodeList} from "../../../../../store/actions/nodeListActions"
import RecentNodes from "./RecentNodes";
import { loadFunctionsToNode } from "../../../../../app-global/helpers/loadFunctionsToNode";
import { addNewNode } from "../../../../../store/actions/elementsActions";
import { createNode } from "../../../../../app-global/helpers/elementController";
import useDidMountEffect  from "../../../../../hooks/useDidMountEffect";
import {loadIconsToNodeList} from "../../../../../app-global/helpers/loadIconsToNodeList";

const PanelContextMenu = () => {
  const { panelMenu } = useSelector((state) => state.menuConfigReducer);
  const { flowWorkSpaceReducer } = useSelector((state) => state.activeFlowReducer);
  const { reactFlowInstance,rotateAllPath,theme } = flowWorkSpaceReducer;
  const nodeList = useSelector((state) => state.nodeListReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
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
    const position = reactFlowInstance.project({
      x: panelMenu.x - 200,
      y: panelMenu.y,
    });
    const newNode = createNode(node.type, position, rotateAllPath, nodeFunction);
    dispatch(addNewNode(newNode));
  }
  useDidMountEffect(() => {
    //localStorage.setItem("node-list", JSON.stringify(nodeList));
  }, [nodeList])
  useEffect(() => {
    // const storedNodeList = JSON.parse(localStorage.getItem("node-list")) || nodeList;
    // const newList = storedNodeList.map(node => {
    //   return {
    //     ...node,
    //     icon:loadIconsToNodeList(node.type)
    //   }
    // })
    // dispatch(setNodeList(newList));
  },[])
  return (
    <>
      {panelMenu.state && (
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
