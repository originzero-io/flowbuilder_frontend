import styled from "styled-components";

export const Item = styled.div`
  padding:7px 7px 7px 2px;
  width:100%;
  cursor:pointer;
  display:flex;
  justify-content: flex-start;
`;
export const WorkspaceContainer = styled.div`
  position:relative;
  background: #212529;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 4%;
`;
export const WorkspaceItemWrapper = styled(Item)`
  background:${(props) => (props.active ? "#343a40" : "none")};
  display:flex;
  justify-content:center;
`;
export const WorkspaceItem = styled.div`
  color:white;
  font-size:1.5vmin;
  border-radius:50%;
  background:${(props) => (props.active ? "rgb(22, 139, 63)" : "#343A40")};
  width:50%;
  padding:2px;
  text-align:center;
  box-shadow: 2px -1px 42px -15px rgba(168,168,168,1);
`;
