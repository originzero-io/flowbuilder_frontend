import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownList = styled.ul`
  margin-top: ${(props) => (props.align === "right" ? "25px" : "10px")};
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  background: ${(props) => props.theme === "dark" ? "rgb(53, 59, 72)" : "rgb(189, 195, 199)"};
  color: ${(props) => (props.theme === "dark" ? "#dcdcdc" : "black")};
  right: ${(props) => (props.align === "right" ? "-50px" : "none")};;
  left: ${(props) => (props.align === "right" ? "none" : "0px")};
  list-style: none;
  border-radius: 4px;
  transform: translateY(-10px);
  transition: opacity 0.2s ease;
  visibility:hidden;
`;

export const DropDownItem = styled.li`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  &:hover {
    letter-spacing:2px;
  }
`;
