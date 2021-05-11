import styled from "styled-components";
import * as themeColor from "../../config/ThemeReference"
export const AppWrapper = styled.div`
  width:100%;
  height:100vh;
`;
export const FlowWrapper = styled.div`
  height:100%;
  width:100%;
`;
export const GroupBarWrapper = styled.div`
  width: ${({visible})=>visible === "visible" ? "250px" : "0px"};
  max-height:50vh;
  transition:width .3s ease;
  padding:10px;
  z-index:5;
  //border-top-left-radius:6px;
  border-bottom-left-radius:6px;
  background:${({theme})=>theme === "dark" ? themeColor.DARK_MENU_BACKGROUND : themeColor.LIGHT_MENU_BACKGROUND};
  overflow-y:auto;
  overflow-x:hidden;
`;

