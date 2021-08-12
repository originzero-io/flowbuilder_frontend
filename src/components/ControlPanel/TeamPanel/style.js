import styled from "styled-components";
export const TeamsContainer = styled.div`
  background: #050038;
  background: #323232;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 4%;
  padding: 5px;
`;
export const TeamItem = styled.div`
  background:orange;
  padding:7px;
  border-radius:5px;
  margin-top:5px;
  width:60%;
  text-align:center;
  cursor:pointer;
`;
export const AddTeamButton = styled.div`
  background:#272353;
  color:whitesmoke;
  border-radius:5px;
  margin-top:5px;
  width:60%;
  height:40px;
  text-align:center;
  cursor:pointer;
  font-size:16px;
  display: flex;
  justify-content:center;
  align-items:center;
  font-size:2vmin;
  &:hover{
    background:#3C3680;
  }
`;