import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  updateEdge,
  useStoreState,
} from "react-flow-renderer";
import { useDispatch, useSelector, useStore } from "react-redux";
import nodeTypes from "./Nodes";
import adjustScreen from "../../app-global/dom/adjustScreen";
import { loadFunctionsToNode } from "../../app-global/helpers/loadFunctionsToNode";
import { openNotification as notification } from "../../app-global/dom/notification";
import { setReactFlowInstance, setPaneClickPosition } from "../../store/reducers/flow/flowGuiReducer";
import {addNewNode, selectNodes, setAllNodesDeselect, setElements, setNodeEnable} from "../../store/reducers/flow/flowElementsReducer"
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "../../store/reducers/menuReducer";
import { setNodeList } from "../../store/reducers/nodeListReducer";
import * as themeColor from "../../config/ThemeReference";
import { closeAllNodeGroupMenu } from "../../store/reducers/flow/flowGuiReducer";
import { createNode, isEdgeExist, removeEdgeFromArray, setSourceColorToEdge } from "../../app-global/helpers/elementController";
import KeyboardEvents from "../global/KeyboardEvents";
import FlowComponents from "./FlowComponents";
import CustomEdge from './Edges/CustomEdge'
import PropTypes from "prop-types"
export default function FlowEditor({ reactFlowWrapper }) {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeList);
  const selectedElements = useStoreState((state) => state.selectedElements);
  const { flowElements, flowGui, flowConfig } = useSelector((state) => state.activeFlow);
  const elements = flowElements.present;
  const { reactFlowInstance, rotateAllPath, miniMapDisplay, edgeType, theme } = flowGui;
  const dispatch = useDispatch();
  const store = useStore();
  const onConnectHandle = (params) => {
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
    const elementArray = store.getState().activeFlow.flowElements.present;
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
  };
  const onLoadHandle = (_reactFlowInstance) => {
    dispatch(setReactFlowInstance(_reactFlowInstance));
    adjustScreen(flowGui,_reactFlowInstance);
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
  const onSelectionContextMenuHandle = (event) => {
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
  return (
    <>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={{ custom: CustomEdge }}
        style={{
          background:
            theme === "light" ? themeColor.LIGHT_PANE : themeColor.DARK_PANE,
        }}
        onLoad={onLoadHandle}
        onDrop={onDropHandle}
        elements={elements}
        onConnect={onConnectHandle}
        onElementsRemove={onElementsRemoveHandle}
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
        zoomOnDoubleClick={false}
        connectionLineStyle={{ stroke: "rgb(22,139,63)", strokeWidth: "2px" }}
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
}