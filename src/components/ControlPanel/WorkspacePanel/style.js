import styled from "styled-components";
export const Item = styled.div`
  padding:7px 7px 7px 2px;
  //border-radius:3px;
  //margin-top:4px;
  width:100%;
  cursor:pointer;
  display:flex;
  justify-content: flex-start;
  //margin-left: 20px;
`;
export const WorkspaceContainer = styled.div`
  background: #212529;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 4%;
  border-right:1px solid rgb(60, 60, 60);
`;
export const WorkspaceItemWrapper = styled(Item)`
  background:${props => props.active ? "rgb(70, 70, 70)" : "none"};
  display:flex;
  justify-content:center;
`;
export const WorkspaceItem = styled.div`
  color:white;
  border-radius:50%;
  background:${props => props.active ? "rgb(22, 139, 63)" : "#343A40"};
  width:50%;
  padding:2px;
  text-align:center;
  box-shadow: 2px -1px 42px -15px rgba(168,168,168,1);
`;