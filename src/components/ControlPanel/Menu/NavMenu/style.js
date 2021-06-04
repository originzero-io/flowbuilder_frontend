import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  //border: 1px solid red;
  flex-direction: column;
  //height:90vh;
  background:#191D1F;
  width:15%;
`
export const NavMenu = styled.ul`
  display:flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 16px;
  user-select:none;
  color:white;
`
export const NavMenuItemWrapper = styled.button`
  background:none;
  border:none;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  cursor:pointer;
  padding:5px;
  margin:3px;
  color:white;
  &:hover{
    background-color: rgba(47, 54, 64,0.7);
    border-right: 3px solid #1890ff;
  }
  &:focus{
    background-color: #1890ff;
  }
`