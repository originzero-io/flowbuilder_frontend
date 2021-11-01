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
    background-color: #636e72;
    border-right: 3px solid rgb(22, 139, 63);
  }
`;
export const CollapsableItem = styled(CollapseIndex)`
  margin-top:2px;
  margin-right:3px;
  padding-left: 13%;
  border-radius:3px;
  background:${props=>props.active ? "rgba(46, 213, 115,0.2)":"none"}
`;
export const TriggerWrapper = styled(CollapseIndex)`
  padding: 7px;
  margin-bottom:2px;
  cursor: pointer;
  user-select:none;
`;
