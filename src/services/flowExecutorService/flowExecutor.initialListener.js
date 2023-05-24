import flowExecutorEvent from "./flowExecutor.event";

const useFlowExecutorInitialListener = () => {
  flowExecutorEvent.onDebugFlow((data) => {
    console.log(data);
  });
};

export default useFlowExecutorInitialListener;
