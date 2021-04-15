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
  height:70vh;
  background:rgba(43,46,53,1);
  transition:width .4s ease;
  padding-top:10px;
  //overflow:hidden;
  position:absolute;
  right:0px;
  top:9vh;
  z-index:5;
  border-top-left-radius:6px;
  border-bottom-left-radius:6px;
  //overflow:auto;
  //visibility: ${({visible})=>visible};
`;

