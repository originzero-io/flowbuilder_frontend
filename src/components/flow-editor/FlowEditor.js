import React, { useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  isEdge,
  MiniMap,
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
  setReactFlowInstance,
} from "../../REDUX/actions/flowActions";
import {
  setElementContextMenu,
  setGroupMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "../../REDUX/actions/menuActions";
import { setNodeList } from "../../REDUX/actions/nodeListActions";
import * as themeColor from "../../config/ThemeReference";
import { closeAllGroupMenu } from "../../REDUX/actions/guiActions";
import AppMenu from "../menus/index";
import ControlButtons from "./ControlButtons";
export default function FlowEditor({ reactFlowWrapper }) {
  const { theme, flagColor } = useSelector((state) => state.guiConfigReducer);
  const { reactFlowInstance, miniMapDisplay } = useSelector(
    (state) => state.flowConfigReducer
  );
  const elements = useSelector((state) => state.elementReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const dispatch = useDispatch();
  const store = useStore();
  const onConnectHandle = (params) => {
    console.log("params", params);
    if (params.source === params.target) {
      notification("ERROR!", "Kendisine bağlanamaz", "error");
    } else {
      const color = elements.filter((els) => els.id === params.source)[0].data
        .group.color;
      const edge = {
        ...params,
        sourceX: 10,
        sourceY: 10,
        style: { stroke: color, strokeWidth: "2px" },
        data: { source: "", target: "", payload: "Anaks" },
      };
      const newElements = addEdge(edge, elements);
      dispatch(setElements(newElements));
    }
  };

  useEffect(() => {
    const newElements = elements.map((els) => {
      if (isEdge(els)) {
        return {
          ...els,
          style: {
            ...els.style,
            stroke: flagColor,
          },
        };
      } else {
        return els;
      }
    });
    dispatch(setElements(newElements));
  }, [flagColor]);

  const onEdgeUpdateHandle = (oldEdge, newConnection) => {
    const elementArray = store.getState().elementReducer;
    const newElements = updateEdge(oldEdge, newConnection, elementArray);
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
        group: { name: nodeGroups[2].name, color: nodeGroups[2].color },
      },
    };
    dispatch(setElements([...elements, newNode]));
    updateRecentStatus(type);
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
    dispatch(closeAllGroupMenu(true));
  };
  const onNodeContextMenuHandle = (e, node) => {
    e.preventDefault();
    dispatch(
      setElementContextMenu({
        state: true,
        x: e.clientX,
        y: e.clientY,
        element: node,
      })
    );
  };
  const onPaneClickHandle = (e) => {
    dispatch(setMultiSelectionContextMenu(false));
    dispatch(setElementContextMenu(false));
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

  useEffect(() => {
    // const control = document.getElementsByClassName("react-flow__controls")[0]
    //   .style;
    // let icons = document.querySelectorAll(".react-flow__controls-button");
    // if (theme === "dark") {
    //   control.setProperty("background", "rgba(53, 59, 72,0.5)", "important");
    //   icons.forEach((icon) => {
    //     icon.children[0].style.setProperty("fill", "#dcdcdc", "important");
    //   });
    // } else {
    //   control.setProperty("background", "rgba(189, 195, 199,0.5)", "important");
    //   icons.forEach((icon) => {
    //     icon.children[0].style.setProperty("fill", "black", "important");
    //   });
    // }
  }, [theme]);

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
  const selected = useStoreState((state) => state.selectedElements);

  useEffect(() => {
    let newElements = [];
    if (selected !== null) {
      const selectedIDArray = selected.map((s) => s.id);
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
  }, [selected]);

  //enableEventListeners();
  const onNodeDoubleClickHandle = (event, node) => {
    const newElements = elements.map((element) => {
      if (element.id === node.id) {
        return {
          ...element,
          data: {
            ...element.data,
            expand: !element.data.expand,
          },
        };
      }
      return element;
    });
    dispatch(setElements(newElements));
  };
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
        //onNodeDoubleClick={onNodeDoubleClick}
        onSelectionContextMenu={onSelectionContextMenuHandle}
        onNodeContextMenu={onNodeContextMenuHandle} //*node sağ tıklama
        onEdgeContextMenu={onNodeContextMenuHandle} //*edge sağ tıklama
        onDragOver={onDragOverHandle}
        onEdgeUpdate={onEdgeUpdateHandle}
        //onNodeDragStart={(e, node) => console.log(node)}
        //onNodeDrag={(e, node) => console.log(node)}
        //onNodeDragStop={(e, node) => console.log(node)}
        //onNodeMouseEnter={(e, node) => console.log(node)} //hover
        //onNodeMouseLeave={(e, node) => console.log(node)} //hover leave
        //onConnectEnd={(e) => console.log(e)}
        //onMove={(flowTransform) => console.log(flowTransform)} //return x,y,zoom
        //onSelectionChange={(els) => console.log(els)}
        deleteKeyCode={46}
        minZoom={0.3}
        maxZoom={4}
        multiSelectionKeyCode={17}
        zoomActivationKeyCode={90}
        zoomOnDoubleClick={false}
        connectionLineStyle={{ stroke: "#3498db", strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[30, 30]}
      >
        <AppMenu />
        <Controls>
          <ControlButtons theme={theme} />
        </Controls>
        <Background
          variant="lines"
          gap={80}
          color={theme === "light" ? "#7f8c8d" : "rgb(170,170,170)"}
          size={theme === "light" ? "0.1px" : "0.1px"}
        />
        <MiniMap
          nodeColor="gray"
          maskColor="rgba(189, 195, 199,0.5)"
          style={{
            visibility: miniMapDisplay,
            background: "rgba(53, 59, 72,0.8)",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>
    </>
  );
}
