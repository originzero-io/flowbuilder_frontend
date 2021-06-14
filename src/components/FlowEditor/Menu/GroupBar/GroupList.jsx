import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../../../store/actions/nodeGroupsActions";
import { deleteGroupOfElement } from "../../../../store/actions/elementsActions";
import { GroupItem, GroupColor, Label} from "./style";
import { useStoreActions } from "react-flow-renderer";
import { DeleteIcon } from "../NavMenu/Icons";
import EditForm from "./EditForm";
import { NameEditIcon } from "../../../global/Icons";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import PropTypes from "prop-types"
export default function GroupList({ theme }) {
  const {nodeGroupsReducer } = useSelector((state) => state.activeFlowReducer);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(null);
  const [editableItem, setEditableItem] = useState({ state: false, group: {} });

  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const deleteIconClickHandle = (groupId) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroup(groupId));
      dispatch(deleteGroupOfElement(groupId))
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

  useDidMountEffect(() => {
    //localStorage.setItem("groups", JSON.stringify(nodeGroups));
  }, [nodeGroupsReducer])
  
  useEffect(() => {
    // const storedGroups = JSON.parse(localStorage.getItem("groups"));
    // if (storedGroups) {
    //   dispatch(loadGroups(storedGroups));
    // }
  },[])

  return (
    <>
      {nodeGroupsReducer.map((group) => {
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

GroupList.propTypes = {
  theme: PropTypes.string.isRequired
}