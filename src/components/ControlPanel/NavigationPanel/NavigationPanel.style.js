import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px -1px 50px -33px rgba(0, 0, 0, 0.75);
  background: #212529;
  z-index: 1;
  flex-basis: 18%;
  position: relative;
  resize: both;
  //border:1px solid rgb(40, 40, 40);
`;
export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  font-size: 16px;
  user-select: none;
  color: black;
`;
export const NavMenuItemWrapper = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2px;
  padding: 7px;
  color: white;
  width: 100%;
  &:hover {
    background-color: #343a40;
  }
  &:focus {
    background-color: rgba(22, 139, 63, 0.6);
  }
`;

export const WorkspaceBrandWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 5px;
  cursor: pointer;
  color: #2ecc71;
  height: 5vh;
  user-select: none;
  position: relative;
`;
export const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  cursor: pointer;
  padding: 5px 0px 5px 2px;
  display: flex;
  align-items: center;
  user-select: none;
`;
