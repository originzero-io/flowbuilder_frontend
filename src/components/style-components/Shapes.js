import styled from "styled-components";
import { readBuilderProgram } from "typescript";

export const Circle = styled.div`
  width: 20px;
  height: 15px;
  background: green;
  border-radius: 50%;
  background-color: #7ee8fa;
  background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
`;
export const Triangle = styled.div`
  margin: -2px -2px;
  border-top-color: ${(props) => props.color || "rgb(80,80,80)"};
  border-right-color: ${(props) => props.color || "rgb(80,80,80)"};
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-style: solid;
  border-width: 10px;
  width: 0px;
  height: 0px;
  border-top-right-radius: 4px;
  align-self:flex-start;
  position:relative;
  cursor:pointer;  
`;
export const Flag = styled.div`
  margin: -3px -3px;
  border-color: #20bf55 #20bf55 transparent #20bf55;
  border-style: solid;
  border-width: 8px;
  border-top-right-radius: 4px;
  width: 0px;
  height: 0px;
  -webkit-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -moz-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -ms-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  -o-filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  filter: drop-shadow(0.9px 1px 1px rgba(0, 0, 0, 0.7));
  box-shadow: inset -22px 115px 72px 12px rgba(255, 3, 255, 1);
`;
