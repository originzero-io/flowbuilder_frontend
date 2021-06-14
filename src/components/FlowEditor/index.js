import React, { useEffect } from "react";
import ReactFlow, {
  addEdge,
  isEdge,
  isNode,
  removeElements,
  updateEdge,
  useStoreState,
} from "react-flow-renderer";
import { useDispatch, useSelector, useStore } from "react-redux";
import nodeTypes from "./Nodes/index";
import { getDataFromDb } from "../../app-global/db";
import adjustScreen from "../../app-global/dom/adjustScreen";
import { loadFunctionsToNode } from "../../app-global/helpers/loadFunctionsToNode";
import { openNotification as notification } from "../../app-global/dom/notification";
import {
  setReactFlowInstance,
  setMiniMapDisplay,
  setClickedElement,
  setPaneClickPosition,
  setTheme
} from "../../store/actions/flowActions";
import {addNewNode, selectNodes, setAllNodesDeselect, setElements, setNodeEnable} from "../../store/actions/elementsActions"
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "../../store/actions/menuActions";
import { setNodeList } from "../../store/actions/nodeListActions";
import * as themeColor from "../../config/ThemeReference";
import { closeAllNodeGroupMenu } from "../../store/actions/flowActions";
import { createNode, isEdgeExist, removeEdgeFromArray, setSourceColorToEdge } from "../../app-global/helpers/elementController";
import KeyboardEvents from "../global/KeyboardEvents";
import FlowComponents from "./FlowComponents";
import { deleteNodeCurrentGroup } from "../../store/actions/nodeGroupsActions";
import PropTypes from "prop-types"
export default function FlowEditor({ reactFlowWrapper }) {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const selectedElements = useStoreState((state) => state.selectedElements);
  const {elementReducer,flowWorkSpaceReducer}= useSelector((state) => state.activeFlowReducer);
  const elements = elementReducer.present;
  const { reactFlowInstance, rotateAllPath, miniMapDisplay, edgeType, theme } = flowWorkSpaceReducer;
  const dispatch = useDispatch();
  const store = useStore();
  const onConnectHandle = (params) => {
    console.log(params);
    if (params.source === params.target) {
      notification("ERROR!", "Nodes cannot connect itself.", "error");
    } else {
      const sourceGroup = elements.find((els) => els.id === params.source).data.group;
      const edge = {
        ...params,
        type:edgeType,
        group: sourceGroup,
        style: { stroke: sourceGroup.color, strokeWidth: "2px" },
        data: { source: "", target: "", payload: "Anaks" },
      };
      const newElements = addEdge(edge, elements);
      const sourceEnable = newElements.find(els => els.id === params.source).data.enable;
      const self = newElements.find(els => els.id === params.target);
      dispatch(setElements(newElements));
      dispatch(setNodeEnable(self,sourceEnable))
    }
  };

  const onEdgeUpdateHandle = (oldEdge, newConnection) => {
    const elementArray = store.getState().activeFlowReducer.elementReducer.present;
    const edgeExist = isEdgeExist(newConnection,elementArray);
    if (edgeExist) {
      const newElements = removeEdgeFromArray(oldEdge,elementArray);
      dispatch(setElements(newElements));
    }
    else {
      const newElements = updateEdge(oldEdge, newConnection, elementArray);
      const newArray = setSourceColorToEdge(newConnection, newElements);
      dispatch(setElements(newArray));
    }
  };

  const onElementsRemoveHandle = (elementsToRemove) => {
    const newElements = removeElements(elementsToRemove, elements);
    dispatch(setElements(newElements));
    const nodesToRemove = elementsToRemove.filter(els => isNode(els));
    nodesToRemove.map(els => {
      dispatch(deleteNodeCurrentGroup(els));
    })
  };
  const onLoadHandle = (_reactFlowInstance) => {
    dispatch(setTheme(theme));
    dispatch(setMiniMapDisplay(miniMapDisplay));
    dispatch(setReactFlowInstance(_reactFlowInstance));
    adjustScreen(flowWorkSpaceReducer,_reactFlowInstance);
    // getDataFromDb(nodeClass)
    //   .then((flow) => {
    //     console.log("ohoo:", flow);
    //     //adjustScreen(flow, _reactFlowInstance);
    //     //dispatch(setElements(flow.elements));
    //   })
    //   .catch((err) => {
    //     console.log("ERROR ON DB", err);
    //     dispatch(setElements(initialElements));
    //   });
  };
  const onDragOverHandle = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDropHandle = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    if (!(type === "")) {
      const nodeFunction = loadFunctionsToNode(type, nodeClass);
      const newNode = createNode(type, position, rotateAllPath, nodeFunction);
      dispatch(addNewNode(newNode))
      updateRecentStatus(type);
    }
  };
  const updateRecentStatus = (type) => {
    const newList = nodeList.map((node) => {
      return node.name === type ? { ...node, createdDate: Date.now() } : node;
    });
    dispatch(setNodeList(newList));
  };
  const onElementClickHandle = (event, element) => {
    event.preventDefault();
    dispatch(setClickedElement(element));
  };
  const onDoubleClickHandle = (event) => {
    event.preventDefault();
    dispatch(setPanelContextMenu(false));
    dispatch(setGroupMenu(false));
  };
  const onNodeContextMenuHandle = (event, node) => {
    event.preventDefault();
    if (selectedElements && selectedElements.length > 1) {
      openMultiSelectionContextMenu(event);
    } else {
      openElementContextMenu(event, node);
    }
  };
  const onPaneClickHandle = (e) => {
    dispatch(setPaneClickPosition(e.clientX,e.clientY))
    closeMultiSelectionContextMenu();
    closeElementContextMenu();
    dispatch(closeAllNodeGroupMenu(true));
    dispatch(setAllNodesDeselect());
  };
  const onPaneContextHandle = (e) => {
    e.preventDefault();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const clientX = e.clientX;
    const clientY = e.clientY;
    //sağdan taşma
    if (windowWidth < clientX + 150) {
      console.log("sola dönecek");
      dispatch(
        setPanelContextMenu({
          state: true,
          x: e.clientX - 250,
          y: e.clientY,
        })
      );
    }
    //soldan taşma
    else if (clientX < 200) {
      dispatch(
        setPanelContextMenu({
          state: true,
          x: e.clientX,
          y: e.clientY,
        })
      );
    }
    //alttan taşma
    else if (windowHeight < clientY + 150) {
      dispatch(
        setPanelContextMenu({
          state: true,
          x: e.clientX,
          y: e.clientY - 400,
        })
      );
    }
    //normal
    else {
      dispatch(
        setPanelContextMenu({
          state: true,
          x: e.clientX,
          y: e.clientY,
        })
      );
    }
  };
  const onSelectionContextMenuHandle = (event, nodes) => {
    console.log("nodes:", nodes);
    event.preventDefault();
    dispatch(
      setMultiSelectionContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY,
      })
    );
  };
  const onSelectionChangeHandle = (selected) => {
    if (selected !== null) {
      const selectedIDArray = selected.map(e => e.id);
      dispatch(selectNodes(selectedIDArray));
    }
  }
  const openMultiSelectionContextMenu = (event) => {
    dispatch(
      setMultiSelectionContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY,
      })
    );
  };
  const closeMultiSelectionContextMenu = () => {
    dispatch(setMultiSelectionContextMenu(false));
  };
  const openElementContextMenu = (event, node) => {
    dispatch(
      setElementContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY,
        element: node,
      })
    );
  };
  const closeElementContextMenu = () => {
    dispatch(setElementContextMenu(false));
  };
  
  useEffect(() => {
    nodeClass.applyElements(elements, dispatch);
  }, [elements]);
  useEffect(() => {
    console.log("first render");
  }, [])
  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        style={{
          background:
            theme === "light" ? themeColor.LIGHT_PANE : themeColor.DARK_PANE,
        }}
        onLoad={onLoadHandle}
        onDrop={onDropHandle}
        elements={elements}
        onConnect={onConnectHandle}
        onElementsRemove={onElementsRemoveHandle}
        onElementClick={onElementClickHandle}
        onDoubleClick={onDoubleClickHandle}
        onPaneContextMenu={onPaneContextHandle}
        onPaneClick={onPaneClickHandle}
        onSelectionContextMenu={onSelectionContextMenuHandle}
        onNodeContextMenu={onNodeContextMenuHandle} //*node sağ tıklama
        onEdgeContextMenu={onNodeContextMenuHandle} //*edge sağ tıklama
        onDragOver={onDragOverHandle}
        onEdgeUpdate={onEdgeUpdateHandle}
        deleteKeyCode={46}
        multiSelectionKeyCode={17}
        minZoom={0.3}
        maxZoom={4}
        zoomActivationKeyCode={90}
        zoomOnDoubleClick={false}
        connectionLineStyle={{ stroke: theme==="dark" ? "#c8d6e5" : "black", strokeWidth: "2px" }}
        //onMove={onMoveHandle} //return x,y,zoom
        // snapToGrid={true}
        // snapGrid={[60, 60]}
        //onNodeDoubleClick={onNodeDoubleClick}
        //onNodeDragStart={(e, node) => console.log(node)}
        //onNodeDrag={(e, node) => console.log(node)}
        //onNodeDragStop={(e, node) => console.log(node)}
        //onNodeMouseEnter={(e, node) => console.log(node)} //hover
        //onNodeMouseLeave={(e, node) => console.log(node)} //hover leave
        //onConnectEnd={(e) => console.log(e)}
        onSelectionChange={onSelectionChangeHandle}
      >
        <FlowComponents theme={theme} miniMapDisplay={miniMapDisplay}/>
        <KeyboardEvents/>
      </ReactFlow>
    </>
  );
}

FlowEditor.propTypes = {
  reactFlowWrapper: PropTypes.object.isRequired,
  flowId: PropTypes.string.isRequired
}