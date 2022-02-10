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
    background-color: #343a40;
  }
`;
export const CollapsableItem = styled(CollapseIndex)`
  font-size:1.5vmin;
  margin-top:1px;
  margin-right:3px;
  padding-left: 13%;
  border-radius:3px;
  background:${props => props.active ? "rgba(22, 139, 63,0.6)" : "none"};
  border-bottom:1px solid rgb(50, 50, 50);
  &:focus {
    background-color: rgba(22, 139, 63,0.6);
  }
`;
export const TriggerWrapper = styled(CollapseIndex)`
  padding: 7px;
  cursor: pointer;
  user-select:none;
`;
