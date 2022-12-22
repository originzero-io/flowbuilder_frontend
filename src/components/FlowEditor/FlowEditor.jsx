import React, { useCallback, useEffect } from "react";
import ReactFlow, { useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import nodeTypes from "./Nodes";
import { setPaneClickPosition } from "store/reducers/flow/flowGuiSlice";
import {addNewNode, addNewEdge, setNodes, setEdges, setNodeEnable, updateEdgePath} from "store/reducers/flow/flowElementsSlice"
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "store/reducers/menuSlice";
import { setNodeList } from "store/reducers/nodeListSlice";
import * as themeColor from "constants/ThemeReference";
import { closeAllNodeGroupMenu } from "store/reducers/flow/flowGuiSlice";
import { createNode } from "./helpers/elementHelper";
import FlowComponents from "./components/FlowComponents";
import PropTypes from "prop-types"
import useActiveFlow from "hooks/useActiveFlow";
import notification from "utils/notificationHelper"
import { openElementContextMenu, openMultiSelectionContextMenu, openPaneContextMenu } from "./helpers/menuHelper";
import { flowExecutorNamespace } from "SocketConnections";
import { useParams } from "react-router-dom";

const propTypes = {
  reactFlowWrapper: PropTypes.object.isRequired,
};
export default function FlowEditor({ reactFlowWrapper }) {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeList);

  const { flowElements, flowGui } = useActiveFlow();
  const { rotateAllPath, miniMapDisplay, edgeType, theme } = flowGui;

  const reactFlowInstance = useReactFlow();
  
  const onNodesChange = useCallback(
    (changes) => {
      dispatch(setNodes(changes));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(setEdges(changes));
    },
    [setEdges]
  );
  
  const flowStyle = {
    background:
      theme === "light" ? themeColor.LIGHT_PANE : themeColor.DARK_PANE,
  }
  
  const onConnect = useCallback((params) => {
    if (params.source === params.target) {
      notification.error("Nodes cannot connect itself");
    } else {
      const sourceGroup = flowElements.nodes.find((els) => els.id === params.source)?.data.group;
      const edge = {
        ...params,
        type: edgeType,
        group: sourceGroup,
        style: { stroke: sourceGroup?.color, strokeWidth: "2px" },
        data: { source: "", target: "", payload: "Anaks" },
      };

      const sourceEnable = flowElements.nodes.find(els => els.id === params.source).data.enable;
      const self = flowElements.nodes.find(els => els.id === params.target);
      dispatch(addNewEdge(edge));
      dispatch(setNodeEnable({ self: self, checked: sourceEnable }));
    }
  }, [addNewEdge, flowElements.nodes]);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    dispatch(updateEdgePath({ oldEdge: oldEdge, newConnection: newConnection }));
  }, [updateEdgePath]);

  const onInitHandle = (reactFlowInstance) => {
    reactFlowInstance.setViewport(flowGui.viewport);
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    console.log("type: ", type);
    if (!(type === "")) {
      const newNode = createNode(type, position, rotateAllPath, nodeClass);  
      dispatch(addNewNode(newNode));
      updateRecentStatus(type);
    }
  };
  const updateRecentStatus = (type) => {
    const newList = nodeList.map((node) => {
      return node.name === type ? { ...node, createdDate: Date.now() } : node;
    });
    dispatch(setNodeList(newList));
  };
  
  const onNodeContextMenu = (event, node) => openElementContextMenu(event, node);
  
  const onPaneContextMenu = (event) => openPaneContextMenu(event);

  const onSelectionContextMenu = (event) => openMultiSelectionContextMenu(event);

  const onDoubleClick = () => {
    dispatch(setPanelContextMenu(false));
    dispatch(setGroupMenu(false));
  };
  const onPaneClick = (event) => {
    dispatch(setPaneClickPosition({x: event.clientX, y: event.clientY}))
    dispatch(setMultiSelectionContextMenu(false));
    dispatch(setElementContextMenu(false));
    dispatch(closeAllNodeGroupMenu(true));
  };
  useEffect(() => {
    flowExecutorNamespace.emit('joinFlowRoom', { flowId });
  }, [])
  
  return (
      <ReactFlow
        nodeTypes={nodeTypes}
        style={flowStyle}
        onInit={onInitHandle}
        nodes={flowElements.nodes}
        edges={flowElements.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDoubleClick={onDoubleClick}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={onPaneClick}
        onSelectionContextMenu={onSelectionContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onNodeContextMenu}
        onDragOver={onDragOver}
        onEdgeUpdate={onEdgeUpdate}
        deleteKeyCode={["Delete"]}
        multiSelectionKeyCode={["Control"]}
        minZoom={0.3}
        maxZoom={4}
        zoomOnDoubleClick={false}
        connectionLineStyle={{ stroke: "rgb(22,139,63)", strokeWidth: "2px" }}
        attributionPosition="bottom-left"
      >
        <FlowComponents theme={theme} miniMapDisplay={miniMapDisplay} />
      </ReactFlow>
  );
}

FlowEditor.propTypes = propTypes;