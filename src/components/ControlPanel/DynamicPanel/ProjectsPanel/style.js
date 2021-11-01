import styled from "styled-components";
export const ProjectsContainerIndex = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  color: white;
  min-height: 200px;
  //overflow:scroll;
`;
export const Box = styled.div`
  background: rgb(22, 137, 63);
  //background:white;
  width: 160px;
  height: 150px;
  border-radius: 6px;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    background-color: #27ae60;
    transition: background-color 0.2s ease-in-out;
  }
  color: white;
`;
export const FlowsContainer = styled(ProjectsContainerIndex)`
`;
export const DashboardsContainer = styled(ProjectsContainerIndex)``;
