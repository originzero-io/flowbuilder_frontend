import store from "index";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";
import {
  saveElements,
  setElements,
} from "store/reducers/flow/flowElementsSlice";
import flowElementServiceSocket from "./flowElementService.socket";

const useFlowElementInitialListener = () => {
  flowElementServiceSocket.onSaveElements((data) => {
    store.dispatch(saveElements(data.data.elements));
  });
  flowElementServiceSocket.onGetElements((data) => {
    store.dispatch(beginTheBar());
    store.dispatch(setElements(data.data));
    store.dispatch(endTheBar());
  });
};

export default useFlowElementInitialListener;
