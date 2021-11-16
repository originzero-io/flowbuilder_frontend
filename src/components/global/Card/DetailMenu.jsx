import React from "react";
import {
  CardMoreButton,
  DetailMenuList,
  DetailMenuWrapper,
  DetailMenuItem,
} from "./style";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/reducers/componentReducer";
import MoveFlow from "../../ControlPanel/DynamicPanel/ProjectsPanel/components/MoveFlow";
import EditFlow from "../../ControlPanel/DynamicPanel/ProjectsPanel/components/EditFlow";
export default function DetailMenu({deleteEvent,data}) {
  const dispatch = useDispatch();
  const moveHandler = () => {
    dispatch(setModal( <MoveFlow flow={data}/>));
  }
  const editHandler = () => {
    dispatch(setModal( <EditFlow flow={data}/>));
  }
  return (
      <DetailMenuWrapper tabIndex="1">
        <CardMoreButton onClick={(e) => e.stopPropagation()}>
          <FiMoreVertical />
        </CardMoreButton>
        <DetailMenuList>
          <MenuItem onClick={moveHandler}>Move</MenuItem>
          <MenuItem onClick={editHandler}>Edit</MenuItem>
          <MenuItem>Share</MenuItem>
          <MenuItem onClick={(e)=>deleteEvent(e,data)}>Delete</MenuItem>
        </DetailMenuList>
      </DetailMenuWrapper>
  );
}

const MenuItem = ({ children, onClick }) => {
    const onClickHandler = (e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
    }
  return (
    <>
      <DetailMenuItem onClick={onClickHandler}>
        {children}
      </DetailMenuItem>
    </>
  );
};

DetailMenu.propTypes = {
    deleteEvent: PropTypes.func,
};
MenuItem.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
};