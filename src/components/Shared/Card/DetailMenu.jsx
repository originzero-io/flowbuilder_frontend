import PropTypes from "prop-types";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import EditFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/EditFlowForm";
import MoveFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/MoveFlowForm";
import {
  DropdownItem,
  DropdownWrapper,
} from "../../StyledComponents/DropdownMenu";
import * as Styled from "./Card.style";

const propTypes = {
  deleteEvent: PropTypes.func,
  data: PropTypes.object,
  getPermission: PropTypes.func,
};
export default function DetailMenu({ deleteEvent, data, getPermission }) {
  const dispatch = useDispatch();
  const moveHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal(<MoveFlow flow={data} />));
  };
  const editHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal(<EditFlow flow={data} />));
  };
  return (
    <DropdownWrapper
      tabIndex="1"
      style={{ position: "absolute", right: "12px", top: "3px" }}
    >
      <Styled.CardMoreButton onClick={(e) => e.stopPropagation()}>
        <FiMoreVertical />
      </Styled.CardMoreButton>
      <Styled.DetailMenuList style={{ border: "1px solid #495057" }}>
        {getPermission("CAN_EDIT_FLOW", {
          flowId: data._id,
          projectId: data.project._id,
        }) && (
          <>
            <DropdownItem onClick={moveHandler}>Move</DropdownItem>
            <DropdownItem onClick={editHandler}>Edit</DropdownItem>
            <DropdownItem onClick={(e) => e.stopPropagation()}>
              Duplicate
            </DropdownItem>
            <DropdownItem onClick={(e) => deleteEvent(e, data)}>
              Delete
            </DropdownItem>
          </>
        )}
      </Styled.DetailMenuList>
    </DropdownWrapper>
  );
}

DetailMenu.propTypes = propTypes;
