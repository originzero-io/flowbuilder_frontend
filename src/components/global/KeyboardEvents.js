import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useStoreActions, useStoreState, useZoomPanHelper } from "react-flow-renderer";
import { saveToDb } from "../../app-global/db";
import { setCopiedElements, setRotateAllPath } from "../../REDUX/actions/flowActions";
import uuid from "react-uuid";
import { addNewNode, pasteNodes } from "../../REDUX/actions/elementsActions";
export default function KeyboardEvents() {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer).present;
  const { reactFlowInstance, rotateAllPath, copiedElements, paneClickPosition} = useSelector((state) => state.flowConfigReducer);
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
