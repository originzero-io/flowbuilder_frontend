import styled from "styled-components";
import * as themeColor from "../../config/ThemeReference";
export const DropdownWrapper = styled.div`
  position: relative;
  font-size: 16px;
  z-index: 6;
`;
export const DropdownList = styled.ul`
  padding: 0px;
  margin-top: ${(props) => (props.align === "right" ? "30px" : "8px")};
  position: absolute;
  display: none;
  flex-direction: column;
  min-width: 120px;
  background: ${(props) =>
    props.theme === "dark" ? "rgb(53, 59, 72)" : "rgb(189, 195, 199)"};
  color: ${(props) => (props.theme === "dark" ? "#dcdcdc" : "black")};
  right: ${(props) => (props.align === "right" ? "-50px" : "none")};
  left: ${(props) => (props.align === "right" ? "none" : "0px")};
  list-style: none;
  border-radius: 4px;
  ${DropdownWrapper}:focus-within & {
    display: flex;
  }
`;

export const DropdownItem = styled.li`
  padding: 8px;
  user-select: none;
  //color:whitesmoke;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: ${themeColor.HOVER_COLOR};
  }
`;
