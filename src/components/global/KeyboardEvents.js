import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useStoreActions, useStoreState, useZoomPanHelper } from "react-flow-renderer";
import { saveToDb } from "../../app-global/db";
import { setRotateAllPath } from "../../store/actions/flowActions";
import { setCopiedElements } from "../../store/actions/controlPanelActions";
import uuid from "react-uuid";
import { pasteNodes } from "../../store/actions/elementActions";
import { openNotification as notification } from "../../app-global/dom/notification";
const KeyboardEvents = () => {
  const dispatch = useDispatch();
  const { flowGui,flowElements } = useSelector((state) => state.activeFlow);
  const { copiedElements } = useSelector((state) => state.controlPanel);
  const { paneClickPosition,reactFlowInstance,rotateAllPath } = flowGui;
  const elements = flowElements.present;
  const selectedElements = useStoreState((state) => state.selectedElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const { fitView } = useZoomPanHelper();

  const selectAllNodesEvent = (key, e) => {
    e.preventDefault();
    setSelectedElements(elements);
  };
  const undoEvent = () => {
    dispatch(UndoActionCreators.undo());
  }
  const redoEvent = () => {
    dispatch(UndoActionCreators.redo());
  }
  const fitViewEvent = () => {
    fitView({ padding: 0.2, includeHiddenNodes: true });
  }
  const saveFlowEvent = (key, e) => {
    e.preventDefault();
    saveToDb(reactFlowInstance);
  }
  const rotateAllNodesEvent = (key, e) => {
    e.preventDefault();
    if (rotateAllPath === "vertical") {
      dispatch(setRotateAllPath("horizontal"));
    } else {
      dispatch(setRotateAllPath("vertical"));
    }
  }
  const copyNodesEvent = (key, e) => {
    e.preventDefault();
    dispatch(setCopiedElements(selectedElements));
    notification("", `${selectedElements.length} nodes copied.`, "success");
  }
  const getPosition = (index) => {
    const position = reactFlowInstance.project({
      x: paneClickPosition.x- index*200 - 100,
      y: paneClickPosition.y,
    });
    return position;
  }
  const pasteNodesEvent = (key, e) => {
    e.preventDefault();    
    const newNodes = copiedElements.map((els,index) => {
      return {
        ...els,
        id: uuid(),
        position:getPosition(index),
      }
    })
    dispatch(pasteNodes(newNodes));
    setSelectedElements(newNodes);
  }
  return (
    <>
      <KeyboardEventHandler
        handleKeys={["ctrl+a"]}
        onKeyEvent={selectAllNodesEvent}
      />
      <KeyboardEventHandler
        handleKeys={["ctrl+z"]}
        onKeyEvent={undoEvent}
      />
      <KeyboardEventHandler
        handleKeys={["ctrl+y"]}
        onKeyEvent={redoEvent}
      />
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
      <KeyboardEventHandler
        handleKeys={["f2"]}
        onKeyEvent={fitViewEvent}
      />
    </>
  );
}
export default React.memo(KeyboardEvents);