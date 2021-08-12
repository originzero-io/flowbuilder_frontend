import React from "react";
import {
  CardMoreButton,
  DetailMenuList,
  DetailMenuWrapper,
  DetailMenuItem,
} from "./style";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from "prop-types";

export default function DetailMenu({deleteEvent}) {
  return (
    <DetailMenuWrapper tabIndex="1">
      <CardMoreButton onClick={(e) => e.stopPropagation()}>
        <FiMoreVertical />
      </CardMoreButton>
      <DetailMenuList>
        <MenuItem>Move</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Share</MenuItem>
        <MenuItem onClick={deleteEvent}>Delete</MenuItem>
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
    <DetailMenuItem onClick={onClickHandler}>
      {children}
    </DetailMenuItem>
  );
};
DetailMenu.propTypes = {
    deleteEvent: PropTypes.func,
};
MenuItem.propTypes = {
    children: PropTypes.oneOfType[PropTypes.element,PropTypes.string],
    onClick: PropTypes.func,
};