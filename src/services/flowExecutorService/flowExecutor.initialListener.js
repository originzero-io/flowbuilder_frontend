import notificationHelper from "utils/ui/notificationHelper";
import flowExecutorEvent from "./flowExecutor.event";

const useFlowExecutorInitialListener = () => {
  flowExecutorEvent.onDebugFlow((data) => {
    // console.log("data: ", data);
    // notificationHelper.warn(data);
  });
};

export default useFlowExecutorInitialListener;
