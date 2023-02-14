import styled from "styled-components";

export const VerticalDivider = styled.div`
  width: 1px;
  height: 20px;
  background: ${(props) => (props.theme === "dark" ? "rgba(189, 195, 199,0.3)" : "rgba(52, 73, 94, 0.3)")};
  box-shadow: -1px -1px 19px -1px rgba(0, 0, 0, 0.75);
`;
export const HorizontalDivider = styled.div`
  margin: 2px;
  width: 100%;
  height: 1px;
  background: ${(props) => (props.theme === "dark" ? "rgba(189, 195, 199,0.3)" : "rgba(52, 73, 94, 0.3)")};
  box-shadow: -1px -1px 19px -1px rgba(0, 0, 0, 0.75);
`;
