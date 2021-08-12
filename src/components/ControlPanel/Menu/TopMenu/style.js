import styled from "styled-components";
import { DropdownWrapper } from "../../../style-components/DropdownMenu";
export const Container = styled.div`
  padding: 5px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  height: 5vh;
  background-color: #323232;
`;
export const SearchBar = styled.input`
  border-radius: 4px;
  padding-left: 10px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #1e1e1e;
  border: none;
  color: whitesmoke;
  width: 250px;
  user-select: none;
`;
export const ProfileWrapper = styled.div`
  cursor: pointer;
  background:rgba(29, 185, 84,0.7);
  color:whitesmoke;
  border-radius: 50%;
  width:45px;
  height:100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select:none;
`;
export const LeftSideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;
export const ProfileList = styled.ul`
  position: absolute;
  display: flex;
  padding-top:3px;
  padding-bottom:3px;
  flex-direction: column;
  min-width: 120px;
  background: white;
  list-style: none;
  right:0px;
  margin-top:3px;
  border-radius: 4px;
  visibility:hidden;
  font-size:12px;
  box-shadow: 1px 1px 33px -11px rgba(0, 0, 0, 0.75);

  ${DropdownWrapper}:focus-within & {
    visibility:visible;
  }
`;