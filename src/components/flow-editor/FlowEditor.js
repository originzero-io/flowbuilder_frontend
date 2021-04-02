import React, { useEffect,useState } from "react";
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
import { useDispatch, useSelector,useStore } from "react-redux";
import uuid from "react-uuid";
import CustomNodes from "../../config/CustomNodes";
import initialElements from "../../config/initial-elements";
import { getDataFromDb } from "../../globals/db";
import adjustScreen from "../../globals/dom/adjustScreen";
import enableEventListeners from "../../globals/dom/enableEventListeners";
import { loadFunctionsToNode } from "../../globals/helpers/loadFunctionsToNode";
import {
  setClickedElement,
  setElements,
  setReactFlowInstance,
} from "../../REDUX/actions/flowActions";
import {
  setElementContextMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "../../REDUX/actions/menuActions";
import { setNodeList,setRecentList } from "../../REDUX/actions/nodeListActions";
import { openNotification as notification } from "../../globals/dom/notification";
import * as themeColor from '../../config/ThemeReference'

export default function FlowEditor({ reactFlowWrapper }) {
  const reactFlowInstance = useSelector((state) => state.reactFlowInstanceReducer);
  const flagColor = useSelector((state) => state.flagColorReducer);
  const theme = useSelector((state) => state.themeReducer);
  const elements = useSelector((state) => state.elementReducer);
  const miniMapDisplay = useSelector((state) => state.miniMapDisplayReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeList = useSelector((state) => state.nodeListReducer);
  const dispatch = useDispatch();
  const store = useStore();
  const onConnect = (params) => {
    console.log("params",params)
    if (params.source === params.target) {
      notification("ERROR!", "Kendisine bağlanamaz", "error");
    }
    else {
      const edge = {
        ...params,
        sourceX: 10,
        sourceY: 10,
        style: { stroke: flagColor, strokeWidth: "2px" },
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

  const onEdgeUpdate = (oldEdge, newConnection) => {
    const elementArray = store.getState().elementReducer;
    const newElements = updateEdge(oldEdge, newConnection, elementArray)
    dispatch(setElements(newElements));  
  }
  const onElementsRemove = (elementsToRemove) => {
    const newElements = removeElements(elementsToRemove,elements)
    dispatch(setElements(newElements));
  }
  const onLoad = (_reactFlowInstance) => {
    dispatch(setReactFlowInstance(_reactFlowInstance));
    const data = getDataFromDb(nodeClass);
    data
      .then((flow) => {
        adjustScreen(flow, _reactFlowInstance);
        dispatch(setElements(flow.elements));
      })
      .catch((err) => {
        console.log("ERROR ON DB",err);
        dispatch(setElements(initialElements));
      });
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
        align: "vertical",
        expand:false
      },
    };
    dispatch(setElements([...elements, newNode]));
    updateRecentStatus(type);
  };
  const updateRecentStatus = (type) => {
    const newList = nodeList.map(node => {
      if (node.name === type) {
        return {
          ...node,
          recent:true,
          date: Date.now()
        }
      }
      else {
        return node;
      }
    })
    dispatch(setNodeList(newList))
  }
  const onElementClick = (event, element) => {
    dispatch(setClickedElement(element));
  };

  const onDoubleClick = (event, element) => {
    dispatch(setPanelContextMenu(false));
  };
  const onNodeContextMenu = (e, node) => {
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
  const onPaneClick = (e) => {
    dispatch(setMultiSelectionContextMenu(false));
    dispatch(setElementContextMenu(false));
  };

  const onPaneContext = (e) => {
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
          x: e.clientX - 200,
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
          y: e.clientY - 150,
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
    const control = document.getElementsByClassName("react-flow__controls")[0]
      .style;
    let icons = document.querySelectorAll(".react-flow__controls-button");
    if (theme === "dark") {
      control.setProperty("background", "rgba(53, 59, 72,0.5)", "important");
      icons.forEach((icon) => {
        icon.children[0].style.setProperty("fill", "#dcdcdc", "important");
      });
    } else {
      control.setProperty("background", "rgba(189, 195, 199,0.5)", "important");
      icons.forEach((icon) => {
        icon.children[0].style.setProperty("fill", "black", "important");
      });
    }
  }, [theme]);

  const onSelectionContextMenu = (e, nodes) => {
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
  const onNodeDoubleClick = (event,node) => {
    console.log("node", node)
    const newElements = elements.map(element => {
      if (element.id === node.id) {
        console.log("bu benim:",element.type)
        return {
          ...element,
          data: {
            ...element.data,
            expand:!element.data.expand
          }
        }
      }
      return element;
    })
    dispatch(setElements(newElements))
  }
  return (
    <>
      <ReactFlow
        nodeTypes={CustomNodes}
        style={{
          background: theme === "light" ? themeColor.LIGHT_PANE : themeColor.DARK_PANE,
        }}
        onLoad={onLoad}
        onDrop={onDrop}
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onElementClick={onElementClick}
        onDoubleClick={onDoubleClick}
        onPaneContextMenu={onPaneContext}
        onPaneClick={onPaneClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onSelectionContextMenu={onSelectionContextMenu}
        onNodeContextMenu={onNodeContextMenu} //*node sağ tıklama
        onEdgeContextMenu={onNodeContextMenu} //*edge sağ tıklama
        onDragOver={onDragOver}
        onEdgeUpdate={onEdgeUpdate}
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
      >
        <Controls/>
        <Background
          gap={50}
          color={theme === "light" ? "#7f8c8d" : "rgb(170,170,170)"}
          size={theme === "light" ? "2px" : "1.5px"}
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
