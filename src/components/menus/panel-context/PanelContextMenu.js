import React, { useCallback, useState, useContext } from "react";
import * as types from "../../../config/NodeTypes";
import { NodeWrapper, NodeElement, Container } from "./style";
import setVariables from "../../../assets/icons/Set_Variables.png";
import combineIcon from "../../../assets/icons/Combine.png";
import splitIcon from "../../../assets/icons/Split.png";
import notificationIcon from "../../../assets/icons/Notification.png";
import Icon from "../../global/Icon";
import FavIcon from "../../style-components/FavIcon";
import { Label } from "../../nodes/styles";
import { useSelector,useDispatch } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import AllNodes from "./AllNodes";
import FavoriteNodes from "./FavoriteNodes";
import {addFav} from "../../../REDUX/actions/nodeListActions"
import RecentNodes from "./RecentNodes";
const PanelContextMenu = () => {
  const panelMenu = useSelector((state) => state.panelMenuReducer);
  const theme = useSelector((state) => state.themeReducer);
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
    dispatch(addFav(newList))
  };
  return (
    <div>
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
    </div>
  );
};

export default PanelContextMenu;
