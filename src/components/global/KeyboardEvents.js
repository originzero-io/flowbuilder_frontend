import React from "react";
import { useStoreActions, useStoreState, useZoomPanHelper } from "react-flow-renderer";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { openNotification as notification } from "../../app-global/dom/notification";
import { setCopiedElements } from "../../store/reducers/controlPanelReducer";
import { pasteNodes } from "../../store/reducers/flow/flowElementsReducer";
import { setRotateAllPath } from "../../store/reducers/flow/flowGuiReducer";
import useActiveFlow from "../../utils/useActiveFlow";
const KeyboardEvents = () => {
  const dispatch = useDispatch();
  const { flowGui,flowElements } = useActiveFlow();
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
    //saveToDb(reactFlowInstance);
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