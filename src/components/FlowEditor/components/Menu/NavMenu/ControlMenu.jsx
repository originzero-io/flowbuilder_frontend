import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { HorizontalDivider } from "components/StyledComponents/Divider";
import { useSelector, useDispatch } from "react-redux";
import {
  setElements,
  setRotateAll,
  setExpandAll,
  deleteAllElements,
} from "store/reducers/flow/flowElementsSlice";
import { setRotateAllPath } from "store/reducers/flow/flowGuiSlice";
import { useStore, useReactFlow } from "reactflow";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useParams } from "react-router";
import useActiveFlow from "utils/hooks/useActiveFlow";
import FlowService from "services/configurationService/flowService/flowService.http";
import notification from "utils/ui/notificationHelper";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import flowElementServiceSocket from "services/configurationService/flowElementService/flowElementService.event";
import {
  RedoIcon,
  UndoIcon,
  SaveIcon,
  DeleteIcon,
  RotateAllIcon,
  FitViewIcon,
  ZoomInIcon,
  ZoomOutIcon,
  LockIcon,
  UnLockIcon,
  ExpandAllIcon,
} from "./Icons";
import * as Styled from "./NavMenu.style";

const StyledMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 6;
  bottom: 10px;
  left: 10px;
  padding: 4px;
  background: ${(props) => props.theme.menuBackground};
`;
export default function ControlMenu() {
  const { flowGui, flowConfig, flowElements } = useActiveFlow();
  const { rotateAllPath, theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  // const canUndo = flowElements.past.length > 0;
  // const canRedo = flowElements.future.length > 0;

  // Todo: useReactFlow();
  // const { zoomIn, zoomOut, fitView } = useReactFlow();

  // const setInteractive = useStore((actions) => actions.setInteractive);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const { flowId } = useParams();
  const saveFlow = async () => {
    // saveToDb(flowConfig,flowGui);
    const { nodes, edges, viewport } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfig,
      gui: {
        ...flowGui,
        viewport,
      },
    };
    await FlowService.saveFlowGui(flowId, flow);

    flowElementServiceSocket.saveElements({
      flowId,
      elements: { nodes, edges },
    });
  };

  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(deleteAllElements());
    }
  };
  const closeAllNodes = () => {
    dispatch(setExpandAll(false));
  };

  const rotateAllHandle = () => {
    if (rotateAllPath === "vertical") {
      dispatch(setRotateAllPath("horizontal"));
    } else {
      dispatch(setRotateAllPath("vertical"));
    }
  };
  useEffect(() => {
    dispatch(setRotateAll(rotateAllPath));
  }, [rotateAllPath]);

  const zoomInHandle = () => {
    reactFlowInstance.zoomIn();
  };
  const zoomOutHandle = () => {
    reactFlowInstance.zoomOut();
  };
  const fitViewHandle = () => {
    reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true });
  };
  const lockHandle = () => {
    setLock(!lock);
  };
  // const undoHandle = () => {
  //   dispatch(UndoActionCreators.undo());
  // }
  // const redoHandle = () => {
  //   dispatch(UndoActionCreators.redo());
  // }

  // useEffect(() => {
  //   setInteractive(lock);
  // }, [lock]);
  return (
    <StyledMenu>
      <Styled.MenuItem
        theme={theme}
        onClick={saveFlow}
        data-tip="Save"
        data-for="save"
      >
        <SaveIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="save" place="right" />
      <HorizontalDivider theme={theme} />
      {/* <MenuItem theme={theme} data-tip="Undo" data-for={tooltip.UNDO} onClick={undoHandle}>
        <UndoIcon theme={theme} disable={!canUndo} />
      </MenuItem>
      <MenuItem theme={theme} data-tip="Redo" data-for={tooltip.REDO} onClick={redoHandle}>
        <RedoIcon theme={theme} disable={!canRedo} />
      </MenuItem> */}
      <HorizontalDivider theme={theme} />
      <Styled.MenuItem
        theme={theme}
        onClick={closeAllNodes}
        data-tip="Close All Nodes"
        data-for="close_nodes"
      >
        <ExpandAllIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="close_nodes" place="right" />
      <Styled.MenuItem
        theme={theme}
        onClick={rotateAllHandle}
        data-tip="Rotate All"
        data-for="rotate_all"
      >
        <RotateAllIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="rotate_all" place="right" />

      <Styled.MenuItem
        theme={theme}
        onClick={deleteAllNodes}
        data-tip="Delete All"
        data-for="delete_all"
      >
        <DeleteIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="delete_all" place="right" />

      <HorizontalDivider theme={theme} />
      <Styled.MenuItem
        theme={theme}
        onClick={zoomInHandle}
        data-tip="Zoom in"
        data-for="zoom_in"
      >
        <ZoomInIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="zoom_in" place="right" />
      <Styled.MenuItem
        theme={theme}
        onClick={zoomOutHandle}
        data-tip="Zoom out"
        data-for="zoom_out"
      >
        <ZoomOutIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="zoom_out" place="right" />
      <Styled.MenuItem
        theme={theme}
        onClick={fitViewHandle}
        data-tip="Fit View"
        data-for="fit_view"
      >
        <FitViewIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="fit_view" place="right" />
      {/* <Styled.MenuItem
        theme={theme}
        onClick={lockHandle}
        data-tip="Lock Screen"
        data-for="lock_screen"
      >
        {lock === true ? (
          <UnLockIcon theme={theme} />
        ) : (
          <LockIcon theme={theme} />
        )}
      </Styled.MenuItem>
      <Tooltip id="lock_screen" place="right" /> */}
    </StyledMenu>
  );
}
