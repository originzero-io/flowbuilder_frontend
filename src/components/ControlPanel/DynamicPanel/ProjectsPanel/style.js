import styled from "styled-components";
export const ProjectsContainerIndex = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding:5px;
  color:white;
  min-height: 200px;
  //overflow:scroll;
`
export const Box = styled.div`
  background:rgb(22,137,63);
  width:160px;
  height:150px;
  border-radius: 6px;
  font-size:48px;
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
export const FlowsContainer = styled(ProjectsContainerIndex)`
`
export const DashboardsContainer = styled(ProjectsContainerIndex)`
`
