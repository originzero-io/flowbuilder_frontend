import styled from "styled-components";
import { DropdownWrapper,DropdownList } from "../../../style-components/DropdownMenu";
export const Container = styled.div`
  padding: 2px;
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: space-between;
  align-items: center;
  background-color: #323232;
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
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;
export const ProfileList = styled(DropdownList)`
  padding-top: 3px;
  padding-bottom: 3px;
  background: white;
  left:-70px;
  margin-top: 3px;
  font-size: 12px;
  ${DropdownWrapper}:focus-within & {
    visibility: visible;
  }
  background:#212529;
  border:1px solid rgba(75, 75, 75, 0.4);
  color:whitesmoke;
`;
