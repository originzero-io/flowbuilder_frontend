import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  //background:#E3E3E3;
  background: #ffff;
  box-shadow: 0px -1px 50px -33px rgba(0, 0, 0, 0.75);

  /* background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #434343 74%); */
  background:#323232;
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
  color: white;
  width: 100%;
  &:hover {
    background-color: #636e72;
    border-right: 3px solid rgb(22, 139, 63);
  }
  &:focus {
    background-color: rgba(46, 213, 115, 0.2);
  }
`;

export const WorkspaceBrandWrapper = styled.div`
  background: #323232;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 5px;
  cursor: pointer;
  color: #2ecc71;
  height: 5vh;
  user-select: none;
  position: relative;
  font-size: 20px;
  border-bottom: 1px solid gray;
`;
