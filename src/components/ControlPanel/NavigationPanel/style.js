import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px -1px 50px -33px rgba(0, 0, 0, 0.75);
  background:#212529;
  z-index: 1;
  flex-basis: 13%;
  position:relative;
`;
export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
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
    background-color: rgb(60, 60, 60);
  }
  &:focus {
    background-color: rgba(46, 213, 115, 0.2);
  }
`;

export const WorkspaceBrandWrapper = styled.div`
  padding: 10px;
  padding-top:0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 5px;
  cursor: pointer;
  color: #2ecc71;
  height: 5vh;
  user-select: none;
  position: relative;
  font-size: 18px;
  //border-bottom: 1px solid gray;
`;
export const Footer = styled.div`
  position:absolute;
  width:100%;
  bottom:0;
  cursor:pointer;
`;
