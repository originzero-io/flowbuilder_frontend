import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  updateGroup,
} from "../../../REDUX/actions/nodeGroupsActions";
import { setElements } from "../../../REDUX/actions/flowActions";
import { GroupItem, GroupColor, Label} from "./style";
import { isEdge, isNode, useStoreActions } from "react-flow-renderer";
import { DeleteIcon, NameEditIcon, SubmitIcon } from "../../global/SvgIcons";
import EditForm from "./EditForm";

export default function GroupList({ theme }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(null);
  const [editableItem, setEditableItem] = useState({ state: false, group: {} });

  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const deleteIconClickHandle = (groupId) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroup(groupId));
      let clearedNodeId;
      const newArray = elements.map((els) => {
        if (isNode(els)) {
          if (els.data.group.id === groupId) {
            clearedNodeId = els.id;
            return {
              ...els,
              data: {
                ...els.data,
                group: {},
              },
            };
          }
          else return els;
        }
        else if (isEdge(els)) {
          if (els.source === clearedNodeId) {
            return {
              ...els,
              style: {
                ...els.style,
                stroke: 'whitesmoke'
              }
            }
          }
          else return els;
        }
      });
      dispatch(setElements(newArray));
    }
  };

  const editIconClickHandle = (group) => {
    if (group.id !== editableItem.group.id) {
      setEditableItem({ state: true, group: { ...group } });
    } else {
      if (editableItem.state === true) {
        setEditableItem({ state: false, group: { ...group } });
      } else setEditableItem({ state: true, group: { ...group } });
    }
  };

  const groupItemClickHandle = (nodes) => {
    setSelectedElements(nodes);
  };

  const labelClickHandle = () => {
    setEditableItem({state:false,group:{}});
  };

  return (
    <>
      {nodeGroups.map((group) => {
        return (
          <GroupItem
            key={group.id}
            theme={theme}
            onMouseEnter={() => setHover(group.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => groupItemClickHandle(group.nodes)}
          >
            {editableItem.state && editableItem.group.id === group.id ? (
              <EditForm
                editableItem={editableItem}
                setEditableItem={setEditableItem}
                theme={theme}
              />
            ) : (
              <>
                <GroupColor width="22px" height="22px" value={group.color} />
                <Label onClick={labelClickHandle}>{group.name}</Label>
              </>
            )}

            {hover === group.id && (
              <>
                <NameEditIcon
                  width="25px"
                  height="25px"
                  onClick={() => editIconClickHandle(group)}
                  theme={theme}
                />
                <DeleteIcon
                  theme={theme}
                  onClick={() => deleteIconClickHandle(group.id)}
                />
              </>
            )}
          </GroupItem>
        );
      })}
    </>
  );
}
