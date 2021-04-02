import styled from "styled-components";
import { DropdownList } from "../../style-components/DropdownComponent";
import * as themeColor from "../../../config/ThemeReference"
export const MenuIndex = styled.div`
  position: fixed;
  width: 300px;
  z-index: 6;
  display: flex;
  flex-direction: row;
  background: #fefefe;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 8px;
`;
export const MenuItem = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON)};
  cursor: pointer;
  &:hover{
    transform: scale(1.1);
  }
  &:focus + ${DropdownList}{
    visibility:visible;
    transform: translateY(0px);
  } 
`;