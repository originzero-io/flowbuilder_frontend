import styled from "styled-components";
export const CollapseIndex = styled.button`
  background:none;
  border:none;
  width:100%;
  color:black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #dcdde1;
    border-right: 3px solid rgb(22, 139, 63);
  }
  &:focus {
    background: rgba(46, 213, 115,0.2);
  }
`;
export const CollapsableItem = styled(CollapseIndex)`
  margin-top:2px;
  margin-right:3px;
  padding-left: 13%;
  background:whitesmoke;
  border-radius:3px;
`;
export const TriggerWrapper = styled(CollapseIndex)`
  padding: 7px;
  margin-bottom:2px;
  cursor: pointer;
  user-select:none;
`;
