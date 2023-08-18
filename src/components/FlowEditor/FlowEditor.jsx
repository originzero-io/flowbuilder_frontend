import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, { useReactFlow } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaneClickPosition,
  closeAllNodeGroupMenu,
} from "store/reducers/flow/flowGuiSlice";
import {
  addNewNode,
  addNewEdge,
  setNodes,
  setEdges,
  setNodeEnable,
  updateEdgePath,
  showRunningNode,
} from "store/reducers/flow/flowElementsSlice";
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "store/reducers/menuSlice";
import { setNodeList } from "store/reducers/panelNodeListSlice";
import PropTypes from "prop-types";
import useActiveFlow from "utils/hooks/useActiveFlow";
import notification from "utils/ui/notificationHelper";
import { isConnectionCyclic } from "components/FlowEditor/helpers/flowHelper";
import themeColor from "components/Shared/ThemeReference";
import notificationHelper from "utils/ui/notificationHelper";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import {
  openElementContextMenu,
  openMultiSelectionContextMenu,
  openPaneContextMenu,
} from "./helpers/menuHelper";
import Utils from "./components/Utils";
import { createNode, isHandleAlreadyConnected } from "./helpers/elementHelper";
import { createCustomNodeObject } from "./helpers/nodeObjectHelper";
import { flowExecutorSocket } from "pages/FlowPage";

const propTypes = {
  reactFlowWrapper: PropTypes.object.isRequired,
};
export default function FlowEditor({ reactFlowWrapper }) {
  const dispatch = useDispatch();
  const nodeList = useSelector((state) => state.panelNodeList);

  const { flowElements, flowGui } = useActiveFlow();
  const { miniMapDisplay, edgeType, theme } = flowGui;

  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (flowExecutorSocket) {
      flowExecutorEvent.onFlowError((data) => {
        notificationHelper.error(data);
      });

      flowExecutorEvent.onDebugFlow((data) => {
        notificationHelper.success(data);
        console.log(data);
      });

      flowExecutorEvent.onClassMessage((data) => {
        // notificationHelper.success(data);
        dispatch(showRunningNode(data));
      });
    }
  }, [flowExecutorSocket]);

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
    background: themeColor[theme].paneBackground,
  };

  const onConnect = useCallback(
    (params) => {
      console.log("params: ", params);
      if (params.source === params.target) {
        notification.error("Nodes cannot connect itself");
      } else if (isHandleAlreadyConnected(params, flowElements.edges)) {
        notificationHelper.error("hop noluyor");
      } else {
        const sourceGroup = flowElements.nodes.find(
          (els) => els.id === params.source
        ).data.ui?.group;
        const edge = {
          ...params,
          type: edgeType,
          group: sourceGroup,
          style: { stroke: sourceGroup?.color, strokeWidth: "2px" },
          data: null,
        };

        const sourceEnable = flowElements.nodes.find(
          (els) => els.id === params.source
        ).data.ui.enable;
        const self = flowElements.nodes.find((els) => els.id === params.target);
        dispatch(addNewEdge(edge));
        dispatch(setNodeEnable({ self, checked: sourceEnable }));
      }
    },
    [addNewEdge, flowElements]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      if (newConnection.source === newConnection.target) {
        notification.error("Nodes cannot connect itself");
      } else {
        dispatch(updateEdgePath({ oldEdge, newConnection }));
      }
    },
    [updateEdgePath, flowElements]
  );

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
    const initialPosition = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    if (!(type === "")) {
      const newNode = createNode(type, initialPosition);
      dispatch(addNewNode(newNode));
      updateRecentStatus(type);
    }
  };
  const updateRecentStatus = (type) => {
    const newList = nodeList.map((node) =>
      node.name === type ? { ...node, createdDate: Date.now() } : node
    );
    dispatch(setNodeList(newList));
  };

  const onNodeContextMenu = (event, node) =>
    openElementContextMenu(event, node);

  const onPaneContextMenu = (event) => openPaneContextMenu(event);

  const onSelectionContextMenu = (event) =>
    openMultiSelectionContextMenu(event);

  const onDoubleClick = () => {
    dispatch(setPanelContextMenu(false));
    dispatch(setGroupMenu(false));
  };
  const onPaneClick = (event) => {
    dispatch(setPaneClickPosition({ x: event.clientX, y: event.clientY }));
    dispatch(setMultiSelectionContextMenu(false));
    dispatch(setElementContextMenu(false));
    dispatch(closeAllNodeGroupMenu(true));
  };
  const customNodes = useMemo(() => createCustomNodeObject(), []);
  return (
    <ReactFlow
      nodeTypes={customNodes}
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
      <Utils flowGui={flowGui} />
    </ReactFlow>
  );
}

FlowEditor.propTypes = propTypes;
