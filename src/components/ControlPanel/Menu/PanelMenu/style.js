import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  //background:#E3E3E3;
  background: #ffff;
  box-shadow: 0px -1px 50px -33px rgba(0,0,0,0.75);

  z-index: 1;
  flex-basis: 13%;
`;
export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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
  margin-bottom: 7px;
  padding: 7px;
  color: black;
  &:hover {
    background-color: #dcdde1;
    border-right: 3px solid rgb(22, 139, 63);
  }
  &:focus {
    background-color: rgba(46, 213, 115,0.2);
  }
`;

export const TeamBrand = styled.div`
  background: rgb(22, 139, 63);
  padding: 10px;
  display:flex;
  justify-content:center;
  align-items: center;
  letter-spacing: 10px;
  cursor: pointer;
  color:whitesmoke;
  height:5vh;
`;
