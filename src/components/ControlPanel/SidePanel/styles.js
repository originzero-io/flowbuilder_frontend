import styled from "styled-components";

export const Container = styled.div`
  //padding:15px;
  padding-top:5px;
  padding-right:15px;
  padding-bottom:5px;
  padding-left:15px;
  background:#1C2022;
  width: 85%;
  color:whitesmoke;
`
export const Box = styled.div`
  background:rgb(22,139,63);
  width:150px;
  height:150px;
  border-radius: 6px;
  font-size:64px;
  display:flex;
  align-items: center;
  justify-content: center;
  margin:7px;
  cursor: pointer;
  transition:background-color 0.3s ease-in-out;
  &:hover{
      background:rgba(210, 218, 226,1.0);
      transition: background 0.3s ease-in-out;
  }

`