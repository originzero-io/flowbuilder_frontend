import React, { useState } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import PropTypes from "prop-types";
const MenuItem = styled.div`
  margin-left:10px;
  padding:2px;
  border-bottom:1px solid rgba(60, 60, 60,0.6);
  &:hover {
    background: rgb(60, 60, 60);
    border-radius: 4px;
  }
`;
const SubMenu = styled.div`
  margin-left:10px;
  background:#292d31;
`;
export default function CollapsibleMenu({ children, ...rest }) {
  const [open, setOpen] = useState(rest.open || false);
  const triggerStyle = {
    marginLeft: "5px",
  };
  return (
    <Collapsible
      open={rest.open || false}
      transitionTime={200}
      transitionCloseTime={200}
      triggerStyle={triggerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...rest}
    >
      <>{children}</>
    </Collapsible>
  );
}
export function CollapsibleSubMenu({ children, ...rest }) {
  const triggerStyle = {
    marginLeft: "10px",
    padding:"3px"
  };
  return (
      <Collapsible
        open={rest.open || false}
        transitionTime={200}
        transitionCloseTime={200}
        triggerStyle={triggerStyle}
        {...rest}
      >
        <SubMenu>{children}</SubMenu>
      </Collapsible>
  );
}
export function CollapsibleMenuItem({ children, ...rest }) {
  return <MenuItem {...rest}>{children}</MenuItem>;
}

CollapsibleMenu.propTypes = {
  children: PropTypes.object,
};
CollapsibleSubMenu.propTypes = {
  children: PropTypes.object,
};
CollapsibleMenuItem.propTypes = {
  children: PropTypes.object,
};
