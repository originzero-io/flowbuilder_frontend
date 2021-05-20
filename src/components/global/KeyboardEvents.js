import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useStoreActions } from "react-flow-renderer";
export default function KeyboardEvents() {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elementReducer).present;
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const selectAllNodesEvent = (key, e) => {
    e.preventDefault();
    setSelectedElements(elements);
  };
  const undoEvent = () => {
    console.log("undoooo")
    dispatch(UndoActionCreators.undo());
  }
  const redoEvent = () => {
    console.log("redooo")

    dispatch(UndoActionCreators.redo());
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
    </>
  );
}
