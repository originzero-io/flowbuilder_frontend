import React, { useState } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import PropTypes from "prop-types";
const MenuItem = styled.div`
  margin-left:10px;
  &:hover {
    background: #576574;
    border-radius: 4px;
  }
`;
const SubMenu = styled.div`
  margin-left:10px;
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
