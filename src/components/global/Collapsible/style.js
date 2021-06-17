import styled from "styled-components";
export const CollapseIndex = styled.button`
  background:none;
  border:none;
  width:100%;
  color:whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(47, 54, 64,0.7);
    border-right: 3px solid rgb(22,139,63);
  }
  &:focus {
    background: rgb(22,139,63);
  }
`;
export const CollapsableItem = styled(CollapseIndex)`
  //margin-left: 25px;
  margin-top:2px;
  margin-right:3px;
  padding-left: 25px;
  background: rgba(189, 195, 199, 0.2);
  border-radius:7px;
`;
export const TriggerWrapper = styled(CollapseIndex)`
  padding: 5px;
  margin:3px;
  cursor: pointer;
  user-select:none;
`;
