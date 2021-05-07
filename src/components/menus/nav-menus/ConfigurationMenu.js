import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Divider from "../../style-components/Divider";
import * as tooltip from "../../../config/TooltipReference";
import { MenuIndex, MenuItem } from "./style";
import { GuideIcon, ProfileIcon, ShareIcon } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownWrapper,
  DropdownList,
  DropDownItem,
} from "../../style-components/DropdownComponent";
import * as themeColor from "../../../config/ThemeReference";
import { importElements } from "../../../REDUX/actions/flowActions";
import adjustScreen from "../../../app-global/dom/adjustScreen";
import { openNotification } from "../../../app-global/dom/notification";
import { loadFunctionsToNode } from "../../../app-global/helpers/loadFunctionsToNode";
const Menu = styled(MenuIndex)`
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  top: 10px;
  right: 45px;
  width: 160px;
`;
const Circle = styled.button`
  width: 55px;
  height: 55px;
  background: transparent;
  border-radius: 50%;
  position: absolute;
  top: -29px;
  border: 7px solid
    ${(props) => (props.theme === "dark" ? "#232323" : "#d7d7d7")};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }
  &:focus + ${DropdownList} {
    visibility: visible;
    transform: translateY(0px);
  }
`;

const FileInput = styled.input`
  display:none;
  background:yellow;
`;
const Box = styled.div`
  height:30px;
`;
const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  height:30px;
`;
export default function ConfigurationMenu() {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { reactFlowInstance } = useSelector((state) => state.flowConfigReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);

  const dispatch = useDispatch();

  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        console.log("reactflefew", reactFlowInstance);
        const flow = reactFlowInstance.toObject();
        console.log("flow:", flow);
        let hiddenElement = document.createElement("a");
        hiddenElement.href =
          "data:application/octet-stream;base64," + btoa(JSON.stringify(flow));
        hiddenElement.target = "_blank";
        hiddenElement.download = "Flow.json";
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
        fileReader.onload = (e) => {
          const flow = JSON.parse(e.target.result);
          adjustScreen(flow, reactFlowInstance);
          const newArray = flow.elements.map((els) => {
            return {
              ...els,
              data: {
                ...els.data,
                onChange: loadFunctionsToNode(els.type, nodeClass),
              },
            };
          });
          dispatch(importElements(newArray));
        };
      } else
        openNotification("Import Error", "Bu dosya import edilemez.", "error");
    },
    [reactFlowInstance]
  );
  return (
    <Menu theme={theme}>
      <DropdownWrapper>
        <MenuItem data-tip="Share" data-for={tooltip.SHARE}>
          <ShareIcon
            width="25px"
            height="25px"
            theme={theme}
          />
        </MenuItem>
        <DropdownList theme={theme}>
          <DropDownItem>Import Flow</DropDownItem>
          <DropDownItem><button onClick={downloadFlowHandle}>Export Flow</button></DropDownItem>
        </DropdownList>
      </DropdownWrapper>
      <Divider />
      <MenuItem data-tip="Guides" data-for={tooltip.GUIDES}>
        <GuideIcon
          width="25px"
          height="25px"
          color={
            theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          }
        />
      </MenuItem>
      <MenuItem>
        <Box>
          <Label>
            <FileInput type="file" onChange={fileUploadHandle} />
            <i className="fas fa-cloud-upload-alt" style={{width:'35px',height:'30px'}}/>
          </Label>
        </Box>
      </MenuItem>
      <DropdownWrapper>
        <Circle theme={theme} data-tip="Profile" data-for={tooltip.PROFILE}>
          <ProfileIcon
            width="50px"
            height="50px"
            color={
              theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
            }
          />
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropDownItem>Profile</DropDownItem>
          <DropDownItem>Settings</DropDownItem>
          <DropDownItem>User Settings</DropDownItem>
          <DropDownItem>Preferences</DropDownItem>
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
