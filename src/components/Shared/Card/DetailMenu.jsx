import React from "react";
import {
  CardMoreButton,
  DetailMenuList,
  DetailMenuWrapper,
  DetailMenuItem,
} from "./Card.style";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/reducers/componentReducer";
import MoveFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/MoveFlowForm";
import EditFlow from "../../ControlPanel/DynamicPanel/ProjectsScreen/forms/EditFlowForm";
import { DropdownWrapper, DropdownItem } from "../../StyledComponents/DropdownMenu";
export default function DetailMenu({deleteEvent,data}) {
  const dispatch = useDispatch();
  const moveHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal(<MoveFlow flow={data} />));
  }
  const editHandler = (e) => {
    e.stopPropagation();
    dispatch(setModal( <EditFlow flow={data}/>));
  }
  return (
      <DropdownWrapper tabIndex="1" style={{position:'absolute',right:'12px',top:'3px'}}>
        <CardMoreButton onClick={(e) => e.stopPropagation()}>
          <FiMoreVertical />
        </CardMoreButton>
        <DetailMenuList style={{border:'1px solid #495057'}}>
          <DropdownItem onClick={moveHandler}>Move</DropdownItem>
          <DropdownItem onClick={editHandler}>Edit</DropdownItem>
          <DropdownItem onClick={(e) => e.stopPropagation()}>Duplicate</DropdownItem>
          <DropdownItem onClick={(e)=>deleteEvent(e,data)}>Delete</DropdownItem>
        </DetailMenuList>
      </DropdownWrapper>
  );
}


DetailMenu.propTypes = {
    deleteEvent: PropTypes.func,
};