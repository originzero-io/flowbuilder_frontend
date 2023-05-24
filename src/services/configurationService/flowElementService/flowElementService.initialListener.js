import store from "index";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";
import {
  saveElements,
  setElements,
} from "store/reducers/flow/flowElementsSlice";
import notificationHelper from "utils/ui/notificationHelper";
import flowElementServiceSocket from "./flowElementService.event";

const useFlowElementInitialListener = () => {
  flowElementServiceSocket.onSaveElements((data) => {
    store.dispatch(saveElements(data.data.elements));
    notificationHelper.success("Flow saved successfully");
  });
  flowElementServiceSocket.onGetElements((data) => {
    store.dispatch(beginTheBar());
    store.dispatch(setElements(data.data));
    store.dispatch(endTheBar());
  });
};

export default useFlowElementInitialListener;
