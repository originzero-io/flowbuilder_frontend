import styled from "styled-components";

export const AppWrapper = styled.div`
  width:100%;
  height:100vh;
`;
export const Screen = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  overflow:hidden;
`;
export const FlowWrapper = styled.div`
  height:100%;
  width:100%;
`;
export const GroupBarWrapper = styled.div`
  width: ${({visible})=>visible === "visible" ? "200px" : "0px"};
  //width:180px;
  max-height:70vh;
  transition:width .4s ease;
  padding:10px;
  //overflow:hidden;
  position:absolute;
  right:0px;
  top:9vh;
  z-index:5;
  border: 1px solid rgba(120,120,120,0.4);
  border-top-left-radius:4px;
  border-bottom-left-radius:4px;
  //overflow:auto;
  //visibility: ${({visible})=>visible};
`;

