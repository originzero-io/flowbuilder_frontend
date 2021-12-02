import styled from "styled-components";
import { DropdownWrapper } from "../../../style-components/DropdownMenu";
export const Container = styled.div`
  padding: 2px;
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: flex-end;
  align-items: center;
  background-color: #323232;
  background-color: #343A40;
`;
export const ProfileWrapper = styled.div`
  cursor: pointer;
  background: rgba(29, 185, 84, 0.7);
  color: whitesmoke;
  border-radius: 50%;
  width: 45px;
  height: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;
export const MenuItem = styled.div`
  color:white;
  cursor:pointer;
  padding: 8px;
  font-size:1.5vmin;
`;
export const LeftSideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;
export const ProfileList = styled.ul`
  position: absolute;
  display: flex;
  padding-top: 3px;
  padding-bottom: 3px;
  flex-direction: column;
  min-width: 120px;
  background: white;
  list-style: none;
  right: 0px;
  margin-top: 3px;
  border-radius: 4px;
  visibility: hidden;
  font-size: 12px;
  box-shadow: 1px 1px 33px -11px rgba(0, 0, 0, 0.75);

  ${DropdownWrapper}:focus-within & {
    visibility: visible;
  }
`;
