import styled from "styled-components";

const Index = styled.div`
  user-select:none;
`;
export const UserHeader = styled(Index)`
  display:flex;
  flex-direction:column;
  align-items:center;
`;
export const AllPermissionsContainer = styled(Index)`
  width:19%;
  margin-bottom:10px;
`;
export const TabContainer = styled(Index)`
  height:90%;
  display: flex;
`;
export const PermissionContainer = styled(Index)`
  border: 1px inset rgba(113, 128, 147,0.4);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y:auto;
  flex:${props=>props.size};
`;
export const PermissionHeader = styled(Index)`
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.3vmin;
  background:rgb(52, 73, 94);
  min-height: 20%;
`;
export const PermissionContent = styled(Index)`
  flex:80%;
`;