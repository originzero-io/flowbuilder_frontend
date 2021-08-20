import styled from "styled-components";
import * as themeColor from "../../config/ThemeReference";
export const DropdownWrapper = styled.div`
  position: relative;
  font-size:14px;
  z-index:6;
`;

export const DropdownList = styled.ul`
  margin-top: ${(props) => (props.align === "right" ? "30px" : "8px")};
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  background: ${(props) => props.theme === "dark" ? "rgb(53, 59, 72)" : "rgb(189, 195, 199)"};
  color: ${(props) => (props.theme === "dark" ? "#dcdcdc" : "black")};
  right: ${(props) => (props.align === "right" ? "-50px" : "none")};;
  left: ${(props) => (props.align === "right" ? "none" : "0px")};
  list-style: none;
  border-radius: 4px;
  visibility:hidden;
  ${DropdownWrapper}:focus-within & {
    visibility:visible;
  }
`;

export const DropDownItem = styled.li`
  padding: 8px;
  user-select: none;
  cursor: pointer;
  display:flex;
  justify-content:space-between;
  align-items:center;
  &:hover{
    background:${themeColor.HOVER_COLOR}
  }
`;
