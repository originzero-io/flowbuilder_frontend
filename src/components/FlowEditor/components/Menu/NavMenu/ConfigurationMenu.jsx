import React, { useCallback, useState } from 'react';
import { useReactFlow, useStore, useStoreActions } from 'react-flow-renderer';
import { BiBrain } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import styled from 'styled-components';
import * as themeColor from 'constants/ThemeReference';
import * as tooltip from 'constants/TooltipReference';
import { logOut } from 'store/reducers/authSlice';
import { changeEdgeType } from 'store/reducers/flow/flowElementsSlice';
import {
  setFlowEdgeType,
  setMiniMapDisplay,
  setTheme,
} from 'store/reducers/flow/flowGuiSlice';
import useActiveFlow from 'hooks/useActiveFlow';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/Shared/Avatar';
import SwitchButton from '../../../Nodes/global/SwitchButton';
import { FileInput } from 'components/Shared/FileInput/FileInput';
import { VerticalDivider } from '../../../../StyledComponents/Divider';
import {
  DropdownItem,
  DropdownList,
  DropdownWrapper,
} from '../../../../StyledComponents/DropdownMenu';
import { Circle } from '../../../../StyledComponents/Shapes';
import { ShareIcon, TuneIcon } from './Icons';
import { Menu, MenuItem } from './NavMenu.style';
import { GoDeviceDesktop } from 'react-icons/go';
import { VscRunAll } from 'react-icons/vsc';
import notification from 'utils/notificationHelper';
import { flowExecutorNamespace } from 'SocketConnections';
import { backendFlowDataBuilder } from 'utils/flowHelpers';
import { useParams } from 'react-router-dom';

const dummyDevices = [
  {
    id: '1',
    name: 'Akin-PC',
    ip: '192.168.1.101',
  },
  {
    id: '2',
    name: 'Anil-PC',
    ip: '192.168.1.102',
  },
];

export default function ConfigurationMenu() {
  const { flowGui, flowConfig } = useActiveFlow();
  const { flowId } = useParams();
  const auth = useAuth();
  const { miniMapDisplay, theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const setSelectedElements = useStore(
    (actions) => actions.setSelectedElements
  );
  const dispatch = useDispatch();

  const downloadFlowHandle = () => {
    if (confirm('Download?')) {
      if (reactFlowInstance) {
        const elements = reactFlowInstance.toObject();
        console.log('elements: ', reactFlowInstance.toObject());
        let hiddenElement = document.createElement('a');
        hiddenElement.href =
          'data:application/octet-stream;base64,' +
          window.btoa(JSON.stringify(elements));
        hiddenElement.target = '_blank';
        hiddenElement.download = `${flowConfig.name}.json`;
        hiddenElement.click();
        hiddenElement.remove();
      }
    }
  };
  const fileUploadHandle = useCallback(
    // (e) => {
    //   const fileReader = new FileReader();
    //   const fileType = e.target.files[0]?.type;
    //   if (fileType === "application/json") {
    //     fileReader.readAsText(e.target.files[0], "UTF-8");
    //     fileReader.onload = (e) => {
    //       const flow = JSON.parse(e.target.result);
    //       const newArray = flow.elements.map((els) => {
    //         return {
    //           ...els,
    //           data: {
    //             ...els.data,
    //             onChange: loadFunctionsToNode(els.type, nodeClass),
    //           },
    //         };
    //       });
    //       dispatch(setElements(newArray));
    //       setSelectedElements(newArray);
    //     };
    //   } else

    //   notification.error("This file cannot be imported. Please provide JSON file");
    // },
    [reactFlowInstance]
  );
  const [active, setActive] = useState({
    theme: false,
    miniMap: false,
  });
  const changeTheme = (checked) => {
    if (theme === 'dark') {
      dispatch(setTheme('light'));
    } else {
      dispatch(setTheme('dark'));
    }
    setActive({ ...active, theme: checked });
  };
  const changeMiniMapDisplay = (checked) => {
    if (miniMapDisplay === 'visible') {
      dispatch(setMiniMapDisplay('hidden'));
    } else {
      dispatch(setMiniMapDisplay('visible'));
    }
    setActive({ ...active, miniMap: checked });
  };
  const edgeTypeHandle = (e) => {
    dispatch(setFlowEdgeType(e.target.value));
    dispatch(changeEdgeType(e.target.value));
  };
  const logOutHandle = () => {
    if (confirm('Are you sure?')) {
      dispatch(logOut());
    }
  };
  const executeHandle = () => {
    const elements = reactFlowInstance.toObject();
    flowExecutorNamespace.emit("executeFlow", backendFlowDataBuilder(flowId, elements));
  };

  return (
    <Menu theme={theme}>
      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <Button
            style={{
              width: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '5px',
            }}
            color="success"
          >
            <VscRunAll></VscRunAll>
            <div onClick = {executeHandle}>Execute</div>
          </Button>
        </MenuItem>
        <DropdownList theme={theme}>
          <DropdownItem>
            <div>This PC</div>
          </DropdownItem>
          {dummyDevices.map((device) => {
            return (
              <DropdownItem style={{ fontSize: '1.5vmin' }} key={device.id}>
                <GoDeviceDesktop
                  style={{ fontSize: '36px', marginRight: '5px' }}
                />
                <div>
                  {device.name}{' '}
                  <span style={{ color: 'gray', fontSize: '1.2vmin' }}>
                    {device.ip}
                  </span>
                </div>
              </DropdownItem>
            );
          })}
        </DropdownList>
      </DropdownWrapper>

      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <ShareIcon width="25px" height="25px" theme={theme} />
        </MenuItem>
        <DropdownList theme={theme}>
          <DropdownItem>
            <FileInput onChange={fileUploadHandle} label="Import Flow" />
          </DropdownItem>
          <DropdownItem onClick={downloadFlowHandle}>Export Flow</DropdownItem>
        </DropdownList>
      </DropdownWrapper>
      <VerticalDivider theme={theme} />

      <MenuItem data-tip="Settings" data-for={tooltip.SETTINGS}>
        <TuneIcon
          color={
            theme === 'dark' ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          }
        />
      </MenuItem>
      <VerticalDivider theme={theme} />

      <MenuItem data-tip="Learn" data-for={tooltip.LEARN}>
        <BiBrain
          style={{
            fontSize: '25px',
            color:
              theme === 'dark' ? themeColor.DARK_ICON : themeColor.LIGHT_ICON,
          }}
        />
      </MenuItem>
      <DropdownWrapper tabIndex="1">
        <Circle theme={theme}>
          <Avatar avatar={auth.avatar} />
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropdownItem>
            Dark Theme
            <SwitchButton checked={active.theme} onChange={changeTheme} />
          </DropdownItem>
          <DropdownItem>
            Mini-map
            <SwitchButton
              checked={active.miniMap}
              onChange={changeMiniMapDisplay}
            />
          </DropdownItem>
          <DropdownItem>Account Settings</DropdownItem>
          <DropdownItem onClick={logOutHandle}>Log Out</DropdownItem>
          <DropdownItem>
            <select onChange={edgeTypeHandle} defaultValue="smoothstep">
              <option value="bezier">Bezier</option>
              <option value="step">Step</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="straight">Straight</option>
            </select>
          </DropdownItem>
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
