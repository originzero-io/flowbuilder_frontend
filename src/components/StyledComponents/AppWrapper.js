import styled from "styled-components";

export const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;
export const GroupBarWrapper = styled.div`
  width: ${({ visible }) => (visible === "visible" ? "250px" : "0px")};
  max-height: 50vh;
  transition: width 0.3s ease;
  padding: 10px;
  z-index: 5;
  border-bottom-left-radius: 6px;
  background: ${(props) => props.theme.menuBackground};
  overflow-y: auto;
  overflow-x: hidden;
`;
