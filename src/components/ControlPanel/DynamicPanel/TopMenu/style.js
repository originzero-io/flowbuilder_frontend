import styled from "styled-components";
import { DropdownWrapper,DropdownList } from "../../../style-components/DropdownMenu";
export const Container = styled.div`
  //padding: 2px;
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background-color: #343a40;
`;
export const MenuItem = styled.div`
  color: white;
  cursor: pointer;
  padding: 8px;
  font-size: 1.5vmin;
`;
export const LeftSideContainer = styled.div`
  margin-left: 15px;
  cursor: pointer;
`;
export const RightSideContainer = styled.div`
  min-width:10%;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;
export const UserInformation = styled.div`
  color:whitesmoke;
  padding:4px;
  font-size:1.2vmin;
`;
export const Profile = styled.div`
  cursor:pointer;
  margin-right:2px;
  display:flex;
  align-items:center;
  &:hover {
    background-color: rgb(60, 60, 60);
  }
`;
export const ProfileList = styled(DropdownList)`
  margin-top: 3px;
  font-size: 12px;
  display:none;
  ${DropdownWrapper}:focus-within & {
    display:flex;
  }
  background:#212529;
  border:1px solid rgba(75, 75, 75, 0.4);
  color:whitesmoke;
`;
