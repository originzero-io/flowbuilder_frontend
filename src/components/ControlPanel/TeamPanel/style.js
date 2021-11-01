import styled from "styled-components";
export const Item = styled.div`
  padding:7px 7px 7px 2px;
  //border-radius:3px;
  margin-top:4px;
  width:100%;
  cursor:pointer;
  display:flex;
  justify-content: flex-start;
  //margin-left: 20px;
`;
export const TeamsContainer = styled.div`
  background: #050038;
  background: #1C232B;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 4%;
  padding-top: 42px;
`;
export const TeamItem = styled(Item)`
  background:${props => props.active ? "rgba(46, 213, 115,0.2)" : "none"};
  border-right:${props => props.active ? "4px solid #2ecc71" : "none"};
`;
export const AddTeamButton = styled(Item)`
  background:gray;
  padding-left: 12px;
  &:hover{
    background:#3C3680;
  }
`;