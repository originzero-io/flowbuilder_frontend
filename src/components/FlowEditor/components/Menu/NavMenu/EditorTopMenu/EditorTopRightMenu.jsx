import {
  checkAllConnectedTrigsHandles,
  checkIfTriggerNode,
  checkUnconnectedNodes,
  getFunctionalNodes,
} from "components/FlowEditor/helpers/debugHelpers";
import Avatar from "components/Shared/Avatar/Avatar";
import { FileInput } from "components/Shared/FileInput/FileInput";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import * as StyledDropdown from "components/StyledComponents/DropdownMenu";
import { useCallback, useState } from "react";
import { BiBrain } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import { LuSettings2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useReactFlow } from "reactflow";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import { logOut } from "store/reducers/authSlice";
import { setModal } from "store/reducers/componentSlice";
import { changeEdgeType, importFlow, selectElements } from "store/reducers/flow/flowElementsSlice";
import { setFlowEdgeType, setMiniMapDisplay, setTheme } from "store/reducers/flow/flowGuiSlice";
import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import useAuth from "utils/hooks/useAuth";
import {
  default as notification,
  default as notificationHelper,
} from "utils/ui/notificationHelper";
import SwitchButton from "../../../../nodes/shared/SwitchButton";
import ConnectionMenu from "../../ConnectionMenu/ConnectionMenu";
import * as Styled from "../NavMenu.style";
import EditViewSwitchButton from "./EditViewSwitchButton";
import ExecuteStopSwitchButton from "./ExecuteStopSwitchButton";

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

const dummyDevices = [
  {
    id: "1",
    name: "Akin-PC",
    ip: "192.168.1.101",
  },
  {
    id: "2",
    name: "Anil-PC",
    ip: "192.168.1.102",
  },
];

export default function EditorTopRightMenu() {
  const { flowGui, flowConfig } = useActiveFlow();
  const auth = useAuth();
  const { miniMapDisplay, theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  const dispatch = useDispatch();

  // ? "executing" , "paused", "error"
  const [executionStatus, setExecutionStatus] = useState("paused");

  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        const elements = reactFlowInstance.toObject();
        console.log("elements: ", reactFlowInstance.toObject());
        const hiddenElement = document.createElement("a");
        hiddenElement.href = `data:application/octet-stream;base64,${window.btoa(
          JSON.stringify(elements),
        )}`;
        hiddenElement.target = "_blank";
        hiddenElement.download = `${flowConfig.name}.json`;
        hiddenElement.click();
        hiddenElement.remove();
      }
    }
  };
  const fileUploadHandle = useCallback(
    (e) => {
      const fileReader = new FileReader();
      const fileType = e.target.files[0]?.type;
      if (fileType === "application/json") {
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
          const flow = JSON.parse(event.target.result);
          dispatch(importFlow(flow));
        };
      } else notification.error("This file cannot be imported. Please provide JSON file");
    },
    [reactFlowInstance],
  );
  const [active, setActive] = useState({
    theme: false,
    miniMap: false,
  });
  const changeTheme = (checked) => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
    setActive({ ...active, theme: checked });
  };
  const changeMiniMapDisplay = (checked) => {
    if (miniMapDisplay === "visible") {
      dispatch(setMiniMapDisplay("hidden"));
    } else {
      dispatch(setMiniMapDisplay("visible"));
    }
    setActive({ ...active, miniMap: checked });
  };
  const edgeTypeHandle = (e) => {
    dispatch(setFlowEdgeType(e.target.value));
    dispatch(changeEdgeType(e.target.value));
  };
  const logOutHandle = () => {
    if (confirm("Are you sure?")) {
      dispatch(logOut());
    }
  };
  const executeFlowHandler = async () => {
    const { nodes, edges, viewport } = reactFlowInstance.toObject();
    const functionalNodes = getFunctionalNodes(nodes);
    const unconnectedNodes = checkUnconnectedNodes(functionalNodes, edges);
    const unconnectedTrigHandles = checkAllConnectedTrigsHandles(nodes, edges);

    if (!checkIfTriggerNode(nodes)) {
      notification.error("Flow does not contain any trigger node.");
      setExecutionStatus("error");
    } else if (unconnectedNodes.exist) {
      notification.error(
        "This flow contains unconnected nodes. Please make sure to connect all nodes.",
      );
      dispatch(selectElements(unconnectedNodes.nodes));
      setExecutionStatus("error");
    } else if (unconnectedTrigHandles.exist) {
      notification.error("Some nodes have unconnected trig handles");
      dispatch(selectElements(unconnectedTrigHandles.nodes));
      setExecutionStatus("error");
    } else {
      const gui = {
        ...flowGui,
        viewport,
      };

      flowExecutorEvent.saveGUISettings(gui, (response) => {
        notificationHelper.success(response);
      });
      flowExecutorEvent.debugFlow({ nodes, edges });
      setExecutionStatus("executing");
    }
  };

  const stopExecutionHandler = () => {
    if (confirm("Flow will be stopped. Are you sure ?")) {
      flowExecutorEvent.stopExecution((data) => {
        notificationHelper.success(data);
        setExecutionStatus("paused");
      });
    } else setExecutionStatus("executing");
  };

  const onSettingsHandler = () => {
    dispatch(setModal(<ConnectionMenu />));
  };

  return (
    <Menu>
      <Styled.MenuItem>
        <ExecuteStopSwitchButton
          executionStatus={executionStatus}
          executeFlowHandler={executeFlowHandler}
          stopFlowHandler={stopExecutionHandler}
        />
      </Styled.MenuItem>
      <Styled.MenuItem>
        <EditViewSwitchButton />
      </Styled.MenuItem>

      <StyledDropdown.DropdownWrapper tabIndex="1">
        <Styled.MenuItem data-tip="Share" data-for="share">
          <BsFillShareFill fontSize={"2.5vmin"} />
        </Styled.MenuItem>
        <Tooltip id="share" place="bottom" />

        <StyledDropdown.DropdownList>
          <StyledDropdown.DropdownItem>
            <FileInput onChange={fileUploadHandle} label="Import Flow" />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem onClick={downloadFlowHandle}>
            Export Flow
          </StyledDropdown.DropdownItem>
        </StyledDropdown.DropdownList>
      </StyledDropdown.DropdownWrapper>

      <Styled.MenuItem data-tip="Settings" data-for="settings" onClick={onSettingsHandler}>
        <LuSettings2 fontSize={"2.5vmin"} />
      </Styled.MenuItem>
      <Tooltip id="settings" place="bottom" />

      <Styled.MenuItem data-tip="Learn" data-for="learn">
        <BiBrain fontSize={"2.5vmin"} />
      </Styled.MenuItem>
      <Tooltip id="learn" place="bottom" />

      <StyledDropdown.DropdownWrapper tabIndex="1">
        <Avatar style={{ marginLeft: "10px" }} avatar={auth.avatar} size={28} />
        <StyledDropdown.DropdownList align="right">
          <StyledDropdown.DropdownItem>
            Dark Theme
            <SwitchButton checked={active.theme} onChange={changeTheme} />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>
            Mini-map
            <SwitchButton checked={active.miniMap} onChange={changeMiniMapDisplay} />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>Account Settings</StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem onClick={logOutHandle}>Log Out</StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>
            <select onChange={edgeTypeHandle} defaultValue="smoothstep">
              <option value="bezier">Bezier</option>
              <option value="step">Step</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="straight">Straight</option>
            </select>
          </StyledDropdown.DropdownItem>
        </StyledDropdown.DropdownList>
      </StyledDropdown.DropdownWrapper>
    </Menu>
  );
}
