import styled from "styled-components";
import * as themeColor from "../../../config/ThemeReference";

export const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 1px;
  left: 19%;
  z-index: 5;
  user-select: none;
`;
export const TabItem = styled.button`
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  border:none;
  min-width: 120px;
  cursor: pointer;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
  text-align: center;
  background: ${({ selected }) => (selected ? themeColor.HOVER_COLOR : "rgba(189, 195, 199,0.6)")};
  position:relative;
  &:hover {
    transform: scale(1.1);
    background: ${themeColor.HOVER_COLOR};  
  }
`;
export const AddButton = styled.div`
  background:rgba(189, 195, 199,0.6);
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  min-width: 20px;
  font-size:18px;
  cursor: pointer;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2px;
  text-align: center;
  &:hover {
    transform: scale(1.1);
    background: ${themeColor.HOVER_COLOR};
  }
`;
export const CloseButton = styled.div`
  position:absolute;
  top:0px;
  right:0;
`;
