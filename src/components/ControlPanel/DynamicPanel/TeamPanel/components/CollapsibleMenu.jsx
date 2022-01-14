import React, { useState } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const MenuItem = styled.div`
  margin-left: 10px;
  padding: 2px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.6);
  &:hover {
    background: rgb(60, 60, 60);
    border-radius: 4px;
  }
`;
const SubMenu = styled.div`
  margin-left: 10px;
  background: #292d31;
`;
export default function CollapsibleMenu({ children, trigger, ...rest }) {
  const [open, setOpen] = useState(rest.open || false);
  const triggerStyle = {
    marginLeft: "5px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  return (
    <Collapsible
      open={rest.open || false}
      transitionTime={200}
      transitionCloseTime={200}
      triggerStyle={triggerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        open ? (
          <>
            {trigger} <MdExpandLess />
          </>
        ) : (
          <>
            {trigger} <MdExpandMore />
          </>
        )
      }
      {...rest}
    >
      <>{children}</>
    </Collapsible>
  );
}
export function CollapsibleSubMenu({ children, trigger, ...rest }) {
  const [open, setOpen] = useState(rest.open || false);
  const triggerStyle = {
    marginLeft: "10px",
    padding: "3px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  return (
    <Collapsible
      open={rest.open || false}
      transitionTime={200}
      transitionCloseTime={200}
      triggerStyle={triggerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        open ? (
          <>
            {trigger} <MdExpandLess />
          </>
        ) : (
          <>
            {trigger} <MdExpandMore />
          </>
        )
      }
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
  trigger: PropTypes.string,
};
CollapsibleSubMenu.propTypes = {
  children: PropTypes.object,
  trigger: PropTypes.string,
};
CollapsibleMenuItem.propTypes = {
  children: PropTypes.object,
};
