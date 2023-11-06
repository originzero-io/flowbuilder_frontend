import React, { useState } from "react";
import styled from "styled-components";
import { HorizontalDivider } from "components/StyledComponents/Divider";
import { useDispatch } from "react-redux";
import { deleteAllElements } from "store/reducers/flow/flowElementsSlice";
import { useReactFlow } from "reactflow";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useParams } from "react-router";
import useActiveFlow from "utils/hooks/useActiveFlow";
import FlowService from "services/configurationService/flowService/flowService.http";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import { RedoIcon, UndoIcon, SaveIcon, DeleteIcon, FitViewIcon, ZoomInIcon, ZoomOutIcon, LockIcon, UnLockIcon, ExpandAllIcon } from "./Icons";
import * as Styled from "./NavMenu.style";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import notificationHelper from "utils/ui/notificationHelper";

const StyledMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 6;
  bottom: 10px;
  left: 40%;
  padding: 4px;
  min-width: 20%;
  background: #323232;
  border-radius: 4px;
`;

export default function ControlMenu() {
  const { flowGui } = useActiveFlow();
  const { theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  // const canUndo = flowElements.past.length > 0;
  // const canRedo = flowElements.future.length > 0;

  // const setInteractive = useStore((actions) => actions.setInteractive);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const saveFlow = async () => {
    const { nodes, edges, viewport } = reactFlowInstance.toObject();

    const gui = {
      ...flowGui,
      viewport,
    };

    flowExecutorEvent.saveGUISettings(gui, (response) => {
      notificationHelper.success(response);
    });
    flowExecutorEvent.saveElements({ nodes, edges }, (response) => {
      notificationHelper.success(response);
    });
  };

  const deleteAllNodes = () => {
    if (confirm("Are you sure?")) {
      dispatch(deleteAllElements());
    }
  };

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
      <Styled.MenuItem theme={theme} onClick={saveFlow} data-tip="Save" data-for="save">
        <SaveIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="save" place="right" />
      {/* <MenuItem theme={theme} data-tip="Undo" data-for={tooltip.UNDO} onClick={undoHandle}>
        <UndoIcon theme={theme} disable={!canUndo} />
      </MenuItem>
      <MenuItem theme={theme} data-tip="Redo" data-for={tooltip.REDO} onClick={redoHandle}>
        <RedoIcon theme={theme} disable={!canRedo} />
      </MenuItem> */}

      <Styled.MenuItem theme={theme} onClick={deleteAllNodes} data-tip="Delete All" data-for="delete_all">
        <DeleteIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="delete_all" place="right" />

      <Styled.MenuItem theme={theme} onClick={zoomInHandle} data-tip="Zoom in" data-for="zoom_in">
        <ZoomInIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="zoom_in" place="right" />
      <Styled.MenuItem theme={theme} onClick={zoomOutHandle} data-tip="Zoom out" data-for="zoom_out">
        <ZoomOutIcon theme={theme} />
      </Styled.MenuItem>
      <Tooltip id="zoom_out" place="right" />
      <Styled.MenuItem theme={theme} onClick={fitViewHandle} data-tip="Fit View" data-for="fit_view">
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
