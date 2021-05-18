import React from "react";
import { useSelector, useDispatch } from "react-redux";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useStoreActions } from "react-flow-renderer";
export default function KeyboardEvents() {
  const elements = useSelector((state) => state.elementReducer);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const selectAllNodesEvent = (key, e) => {
    e.preventDefault();
    setSelectedElements(elements);
  };
  return (
    <>
      <KeyboardEventHandler
        handleKeys={["ctrl+a"]}
        onKeyEvent={selectAllNodesEvent}
      />
    </>
  );
}
