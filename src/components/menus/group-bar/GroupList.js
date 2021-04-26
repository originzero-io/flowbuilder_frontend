import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroup,
  updateGroup,
} from "../../../REDUX/actions/nodeGroupsActions";
import { setElements } from "../../../REDUX/actions/flowActions";
import { DeleteButton, ColorFlag, GroupItem, GroupColor, Label } from "./style";
import styled from "styled-components";
import { useStoreActions, isNode } from "react-flow-renderer";
import { DeleteIcon, NameEditIcon } from "../../global/SvgIcons";
import EditForm from "./EditForm";
const NonGroups = styled.button`
  background: transparent;
  border: 1px solid orange;
  padding: 3px;
  width: 100%;
  font-size: 10px;
  color: ${(props) => (props.theme === "dark" ? "whitesmoke" : "black")};
  &:hover {
    background: orange;
  }
`;

export default function GroupList({ theme }) {
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [itemHover, setItemHover] = useState(null);
  const [flagHover, setFlagHover] = useState(null);
  const [clickedItem, setClickedItem] = useState({ state: false });
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const deleteGroupHandle = (groupId) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteGroup(groupId));
      const newArray = elements.map((els) => {
        if (els.data.group.id === groupId) {
          return {
            ...els,
            data: {
              ...els.data,
              group: {},
            },
          };
        } else {
          return els;
        }
      });
      dispatch(setElements(newArray));
    }
  };
  const groupItemClickHandle = (group) => {
    if (clickedItem.state === true) {
      setClickedItem({ state: false, ...group });
    } else setClickedItem({ state: true, ...group });
  };
  
  const selectItems = (nodes) => {
    setSelectedElements(nodes);
  };
  return (
    <>
      <>
        {nodeGroups.map((group) => {
          return (
            <div key={group.id}>
              <GroupItem
                key={group.id}
                theme={theme}
                onMouseEnter={() => setItemHover(group.id)}
                onMouseLeave={() => setItemHover(null)}
                onClick={() => selectItems(group.nodes)}
              >
                <GroupColor
                  value={group.color}
                  onMouseEnter={() => setFlagHover(group.id)}
                  onMouseLeave={() => setFlagHover(null)}
                />
                <Label>{group.name}</Label>
                {itemHover === group.id && (
                  <>
                    <NameEditIcon width="25px" height="25px" onClick={() => groupItemClickHandle(group)} theme={theme} />
                    <DeleteIcon theme={theme} onClick={() => deleteGroupHandle(group.id)}/>
                  </>
                )}
              </GroupItem>
              {clickedItem.id === group.id && clickedItem.state && (
                <EditForm clickedItem={clickedItem} setClickedItem={setClickedItem}/>
              )}
            </div>
          );
        })}
      </>
    </>
  );
}
