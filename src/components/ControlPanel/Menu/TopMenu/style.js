import styled from "styled-components";
import {DropdownList} from "../../../style-components/DropdownMenu"
export const Container = styled.div`
  padding: 5px;
  display: flex;
  width:100%;
  background-color: #111518;
  justify-content: space-between;
  align-items: center;
  height:40px;
`;
export const SearchBar = styled.input`
  border-radius: 4px;
  padding-left: 10px;
  margin-left:30px;
  background-color: transparent;
  border: 1px solid #636e72;
  color:whitesmoke;
  width:300px;
  user-select: none;
`;
export const ProfileWrapper = styled.div`
  cursor:pointer;
  &:focus + ${DropdownList} {
    visibility: visible;
    transform: translateY(0px);
  }
`;
export const LeftSideContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items: stretch;
`;
