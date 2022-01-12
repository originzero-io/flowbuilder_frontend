import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { default as ReactTopLoadingBar } from "react-top-loading-bar";
import { setLoadingBarProgress } from "../../store/reducers/componentReducer.js";

function LoadingBar() {
  const dispatch = useDispatch();
  const loadingBar = useSelector((state) => state.loadingBar);
  return (
    <ReactTopLoadingBar
      color="#28b485"
      progress={loadingBar.progress}
      waitingTime={400}
      height={3}
      onLoaderFinished={() => dispatch(setLoadingBarProgress(0))}
    />
  );
}

export default LoadingBar;
