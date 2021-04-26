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
  width: ${({visible})=>visible === "visible" ? "250px" : "0px"};
  max-height:50vh;
  transition:width .3s ease;
  padding:10px;
  z-index:5;
  /* border: 1px solid rgba(120,120,120,0.4); */
  border-top-left-radius:6px;
  border-bottom-left-radius:6px;
  background:rgba(0,0,0,0.3);
  overflow-y:auto;
  overflow-x:hidden;
`;

