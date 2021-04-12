import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../../REDUX/actions/nodeGroupsActions";
import { DeleteButton, ColorFlag, GroupItem, Label } from "./style";
export default function GroupList({ theme }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const dispatch = useDispatch();
  const deleteGroupHandle = (groupId) => {
    dispatch(deleteGroup(groupId));
  };
  return (
    <>
      {nodeGroups.map((group) => {
        return (
          <GroupItem theme={theme}>
            <DeleteButton onClick={() => deleteGroupHandle(group.id)}>X</DeleteButton>
            <Label contentEditable={true} spellCheck={false}>
              {group.name}
            </Label>
            <ColorFlag type="color" value={group.color} />
          </GroupItem>
        );
      })}
    </>
  );
}
