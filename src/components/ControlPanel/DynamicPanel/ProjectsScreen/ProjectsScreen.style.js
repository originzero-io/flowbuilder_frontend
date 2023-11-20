import styled from "styled-components";
import { CardContainer } from "components/Shared/Card/Card.style";

export const ProjectsContainerIndex = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  color: white;
  background-color: #ffff;
`;
export const Box = styled(CardContainer)`
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: rgb(22, 137, 63);
    transition: background-color 0.2s ease-in-out;
  }
`;

export const SearchBar = styled.input`
  border-radius: 4px;
  padding-left: 10px;
  margin-right: 5px;
  margin-left: 9px;
  margin-top: 5px;
  background-color: #212529;
  border: 2px solid rgba(75, 75, 75, 0.4);
  color: whitesmoke;
  width: 220px;
  height: 3vh;
  user-select: none;
  outline-color: green;
`;
export const FlowsContainer = styled(ProjectsContainerIndex)`
  display: flex;
  flex-direction: column;
  color: green;
`;
export const DashboardsContainer = styled(ProjectsContainerIndex)``;
