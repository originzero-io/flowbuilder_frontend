import flowExecutorSocket from "./flowExecutor.socket";

const useFlowExecutorInitialListener = () => {
  flowExecutorSocket.onDebugFlow((data) => {
    console.log(data);
  });
};

export default useFlowExecutorInitialListener;
