import styled from "styled-components";
export const CollapseIndex = styled.button`
  background:none;
  border:none;
  width:100%;
  color:white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(60, 60, 60);
  }
`;
export const CollapsableItem = styled(CollapseIndex)`
  font-size:1.5vmin;
  margin-top:1px;
  margin-right:3px;
  padding-left: 13%;
  border-radius:3px;
  background:${props => props.active ? "rgba(46, 213, 115,0.2)" : "none"};
  border-bottom:1px solid rgb(60, 60, 60);
`;
export const TriggerWrapper = styled(CollapseIndex)`
  padding: 7px;
  cursor: pointer;
  user-select:none;
`;
