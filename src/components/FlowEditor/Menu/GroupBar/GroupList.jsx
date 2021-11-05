import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  loadGroups,
} from "../../../../store/actions/nodeGroupsActions";
import { deleteGroupOfElement } from "../../../../store/actions/elementsActions";
import { GroupItem, GroupColor, Label } from "./style";
import { isNode, useStoreActions } from "react-flow-renderer";
import { DeleteIcon } from "../NavMenu/Icons";
import EditForm from "./EditForm";
import { NameEditIcon } from "../../../Global/icons";
import PropTypes from "prop-types";
import {
  deleteGroupService,
  getGroupsService,
} from "../../../../services/groupService";
import { useParams } from "react-router";
const GroupList = ({ theme }) => {
  const { flowGroups, flowElements, flowWorkspace } =
    useSelector((state) => state.activeFlow);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(null);
  const [editableItem, setEditableItem] = useState({ state: false, group: {} });
  const { flowId } = useParams();
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const deleteIconClickHandle = async (group) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroupOfElement(group));
      const data = await deleteGroupService(group);
      dispatch(deleteGroup(data.group));
    }
  };
  const groupItemClickHandle = (group) => {
    const newArr = flowElements.present.filter(
      (els) => isNode(els) && els.data.group._id === group._id
    );
    setSelectedElements(newArr);
  };
  const editIconClickHandle = (group) => {
    if (group._id !== editableItem.group._id) {
      setEditableItem({ state: true, group: { ...group } });
    } else {
      if (editableItem.state === true) {
        setEditableItem({ state: false, group: { ...group } });
      } else setEditableItem({ state: true, group: { ...group } });
    }
  };
  const labelClickHandle = () => {
    setEditableItem({ state: false, group: {} });
  };
  return (
    <>
      {flowGroups.length > 0
        ? flowGroups.map((group) => {
          return (
            <GroupItem
              key={group._id}
              theme={theme}
              onMouseEnter={() => setHover(group._id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => groupItemClickHandle(group)}
            >
              {editableItem.state && editableItem.group._id === group._id ? (
                <EditForm
                  editableItem={editableItem}
                  setEditableItem={setEditableItem}
                  theme={theme}
                />
              ) : (
                <>
                  <GroupColor
                    width="22px"
                    height="22px"
                    value={group.color}
                  />
                  <Label onClick={labelClickHandle}>{group.name}</Label>
                </>
              )}

              {hover === group._id && (
                <>
                  <NameEditIcon
                    width="25px"
                    height="25px"
                    onClick={() => editIconClickHandle(group)}
                    theme={theme}
                  />
                  <DeleteIcon
                    theme={theme}
                    onClick={() => deleteIconClickHandle(group)}
                  />
                </>
              )}
            </GroupItem>
          );
        })
        : "There is no group"
      }
    </>
  );
};

export default React.memo(GroupList);
GroupList.propTypes = {
  theme: PropTypes.string.isRequired,
};
