import React from "react";
import {
  useStore
} from "reactflow";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import notification from "utils/notificationHelper";
import { setCopiedElements } from "store/reducers/controlPanelSlice";
import { pasteNodes } from "store/reducers/flow/flowElementsSlice";
import { setRotateAllPath } from "store/reducers/flow/flowGuiSlice";
import useActiveFlow from "hooks/useActiveFlow";

const KeyboardEvents = () => {
  const dispatch = useDispatch();
  const { flowGui, flowElements } = useActiveFlow();
  const { copiedElements } = useSelector((state) => state.controlPanel);
  const { paneClickPosition, reactFlowInstance, rotateAllPath } = flowGui;
  const elements = flowElements;
  const selectedElements = useStore((state) => state.selectedElements);
  const setSelectedElements = useStore(
    (actions) => actions.setSelectedElements
  );
  //const { fitView } = useZoomPanHelper();

  const selectAllNodesEvent = (key, e) => {
    e.preventDefault();
    //setSelectedElements(elements);
  };
  // const undoEvent = () => {
  //   dispatch(UndoActionCreators.undo());
  // };
  // const redoEvent = () => {
  //   dispatch(UndoActionCreators.redo());
  // };
  const fitViewEvent = () => {
    //fitView({ padding: 0.2, includeHiddenNodes: true });
  };
  const saveFlowEvent = (key, e) => {
    e.preventDefault();
    //saveToDb(reactFlowInstance);
  };
  const rotateAllNodesEvent = (key, e) => {
    e.preventDefault();
    if (rotateAllPath === "vertical") {
      dispatch(setRotateAllPath("horizontal"));
    } else {
      dispatch(setRotateAllPath("vertical"));
    }
  };
  const copyNodesEvent = (key, e) => {
    e.preventDefault();
    dispatch(setCopiedElements(selectedElements));
    notification.success(`${selectedElements.length} nodes copied`, { icon: "👏",position:'top-center' });
  };
  const getPosition = (index) => {
    const position = reactFlowInstance.project({
      x: paneClickPosition.x - index * 200 - 100,
      y: paneClickPosition.y,
    });
    return position;
  };
  const pasteNodesEvent = (key, e) => {
    e.preventDefault();
    const newNodes = copiedElements.map((els, index) => {
      return {
        ...els,
        id: uuid(),
        position: getPosition(index),
      };
    });
    dispatch(pasteNodes(newNodes));
    setSelectedElements(newNodes);
  };
  return (
    <>
      <KeyboardEventHandler
        handleKeys={["ctrl+a"]}
        onKeyEvent={selectAllNodesEvent}
      />
      {/* <KeyboardEventHandler handleKeys={["ctrl+z"]} onKeyEvent={undoEvent} />
      <KeyboardEventHandler handleKeys={["ctrl+y"]} onKeyEvent={redoEvent} /> */}
      <KeyboardEventHandler
        handleKeys={["ctrl+s"]}
        onKeyEvent={saveFlowEvent}
      />
      <KeyboardEventHandler
        handleKeys={["ctrl+r"]}
        onKeyEvent={rotateAllNodesEvent}
      />
      <KeyboardEventHandler
        handleKeys={["ctrl+c"]}
        onKeyEvent={copyNodesEvent}
      />
      <KeyboardEventHandler
        handleKeys={["ctrl+v"]}
        onKeyEvent={pasteNodesEvent}
      />
      <KeyboardEventHandler handleKeys={["f2"]} onKeyEvent={fitViewEvent} />
    </>
  );
};
export default React.memo(KeyboardEvents);
