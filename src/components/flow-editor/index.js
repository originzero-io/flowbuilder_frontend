import React, { useEffect } from "react";
import ReactFlow, {
  addEdge,
  isEdge,
  removeElements,
  updateEdge,
  useStoreState,
} from "react-flow-renderer";
import { useDispatch, useSelector, useStore } from "react-redux";
import uuid from "react-uuid";
import nodeTypes from "../nodes/index";
import initialElements from "../../config/initial-elements";
import { getDataFromDb } from "../../app-global/db";
import adjustScreen from "../../app-global/dom/adjustScreen";
import enableEventListeners from "../../app-global/dom/enableEventListeners";
import { loadFunctionsToNode } from "../../app-global/helpers/loadFunctionsToNode";
import { openNotification as notification } from "../../app-global/dom/notification";
import {
  setClickedElement,
  setElements,
  setExpandAllAction,
  setReactFlowInstance,
  setZoom,
} from "../../REDUX/actions/flowActions";
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "../../REDUX/actions/menuActions";
import { setNodeList } from "../../REDUX/actions/nodeListActions";
import * as themeColor from "../../config/ThemeReference";
import { closeAllNodeGroupMenu } from "../../REDUX/actions/guiActions";
import FlowContent from "./FlowContent";
export default function FlowEditor({ reactFlowWrapper }) {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { reactFlowInstance, miniMapDisplay } = useSelector(
    (state) => state.flowConfigReducer
  );
  const elements = useSelector((state) => state.elementReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const selectedElements = useStoreState((state) => state.selectedElements);

  const dispatch = useDispatch();
  const store = useStore();
  
  const onConnectHandle = (params) => {
    console.log("params", params);
    if (params.source === params.target) {
      notification("ERROR!", "Kendisine bağlanamaz", "error");
    } else {
      const sourceColor = elements.filter((els) => els.id === params.source)[0]
        .data.group.color;
      const targetColor = elements.filter((els) => els.id === params.target)[0]
        .data.group.color;
      const edge = {
        ...params,
        sourceX: 10,
        sourceY: 10,
        style: { stroke: sourceColor, strokeWidth: "2.5px" },
        data: { source: "", target: "", payload: "Anaks" },
      };
      const newElements = addEdge(edge, elements);
      dispatch(setElements(newElements));
    }
  };

  const onEdgeUpdateHandle = (oldEdge, newConnection) => {
    const elementArray = store.getState().elementReducer;
    console.log("store-state-elements:", elementArray)
    console.log("new connection",newConnection)
    const edgeColor = elementArray.filter(ela => ela.id === newConnection.source)[0].data.group.color;
    console.log("edge-color:",edgeColor)
    const newArray = elementArray.map(ela => {
      if (isEdge(ela)) {
        return {
          ...ela,
          style: {
            ...ela.style,
            stroke:edgeColor
          }  
        }
      }
      return ela;
    })
    console.log("new-array:",newArray)
    const newElements = updateEdge(oldEdge, newConnection, newArray);
    dispatch(setElements(newElements));
  };
  const onElementsRemoveHandle = (elementsToRemove) => {
    const newElements = removeElements(elementsToRemove, elements);
    dispatch(setElements(newElements));
  };
  const onLoadHandle = (_reactFlowInstance) => {
    dispatch(setReactFlowInstance(_reactFlowInstance));
    const data = getDataFromDb(nodeClass);
    data
      .then((flow) => {
        adjustScreen(flow, _reactFlowInstance);
        dispatch(setElements(flow.elements));
      })
      .catch((err) => {
        console.log("ERROR ON DB", err);
        dispatch(setElements(initialElements));
      });
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
      const newNode = {
        id: uuid(),
        type,
        position,
        data: {
          label: `${type}`,
          onChange: nodeFunction,
          targetCount: 1,
          sourceCount: 1,
          align: "horizontal",
          expand: false,
          enable: true,
          group: {nodes:[]},
        },
      };
      dispatch(setElements([...elements, newNode]));
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
    dispatch(setClickedElement(element));
  };

  const onDoubleClickHandle = (event, element) => {
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
    closeMultiSelectionContextMenu();
    closeElementContextMenu();
    dispatch(closeAllNodeGroupMenu(true));
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

  const onSelectionContextMenuHandle = (e, nodes) => {
    e.preventDefault();
    dispatch(
      setMultiSelectionContextMenu({
        state: true,
        x: e.clientX,
        y: e.clientY,
      })
    );
  };

  useEffect(() => {
    let newElements = [];
    if (selectedElements !== null) {
      const selectedIDArray = selectedElements.map((s) => s.id);
      const elementIDArray = elements.map((e) => e.id);
      const selectedElementsIDArray = elementIDArray.filter((elementId) =>
        selectedIDArray.includes(elementId)
      );
      newElements = elements.map((els) => {
        if (selectedElementsIDArray.includes(els.id)) {
          if (isEdge(els)) {
            return {
              ...els,
              animated: true,
            };
          } else {
            return {
              ...els,
              data: {
                ...els.data,
                selected: true,
              },
            };
          }
        } else {
          if (isEdge(els)) {
            return {
              ...els,
              animated: false,
            };
          } else {
            return {
              ...els,
              data: {
                ...els.data,
                selected: false,
              },
            };
          }
        }
      });
    } else {
      newElements = elements.map((els) => {
        if (isEdge(els)) {
          return {
            ...els,
            animated: false,
          };
        } else {
          return {
            ...els,
            data: {
              ...els.data,
              selected: false,
            },
          };
        }
      });
    }
    dispatch(setElements(newElements));
  }, [selectedElements]);

  //enableEventListeners();

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

  const onMoveHandle = (flowTransform) => {
    dispatch(setZoom(flowTransform.zoom))
  }
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
        minZoom={0.3}
        maxZoom={4}
        multiSelectionKeyCode={17}
        zoomActivationKeyCode={90}
        zoomOnDoubleClick={false}
        connectionLineStyle={{ stroke: "#3498db", strokeWidth: 2 }}
        onMove={onMoveHandle} //return x,y,zoom
        // snapToGrid={true}
        // snapGrid={[60, 60]}
        //onNodeDoubleClick={onNodeDoubleClick}
        //onNodeDragStart={(e, node) => console.log(node)}
        //onNodeDrag={(e, node) => console.log(node)}
        //onNodeDragStop={(e, node) => console.log(node)}
        //onNodeMouseEnter={(e, node) => console.log(node)} //hover
        //onNodeMouseLeave={(e, node) => console.log(node)} //hover leave
        //onConnectEnd={(e) => console.log(e)}
        //onSelectionChange={(els) => console.log(els)}
      >
        <FlowContent theme={theme} miniMapDisplay={miniMapDisplay} />
      </ReactFlow>
    </>
  );
}
