import React, { useState } from "react";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const MenuItem = styled.div`
  padding: 2px;
  padding-left: 8px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.6);
  &:hover {
    background: #343a40;
    //border-radius: 4px;
  }
`;
const TriggerLabel = styled.span`
  padding-left:7px;
`;
const SubMenu = styled.div`
  margin-left: 7px;
  background: #292d31;
  border-left: 1px solid #3e464d;
  border-bottom-left-radius:4px;
  margin-bottom: 5px;
`;
export default function CollapsibleMenu({ children, trigger, ...rest }) {
  const [open, setOpen] = useState(rest.open || true);
  const triggerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '2px 2px 2px 8px',
  };
  const openTriggerStyle = {
    ...triggerStyle,
    background: '#3e464d'
  };
  return (
    <Collapsible
      open={rest.open || true}
      transitionTime={150}
      transitionCloseTime={150}
      triggerStyle={open ? openTriggerStyle : triggerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        open ? (
          <>
            <MdExpandLess /> <TriggerLabel>{trigger} </TriggerLabel>
          </>
        ) : (
          <>
            <MdExpandMore /> <TriggerLabel>{trigger} </TriggerLabel>
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
  const [open, setOpen] = useState(rest.open || true);
  const triggerStyle = {
    marginTop:'3px',
    marginLeft: "7px",
    padding: "3px",
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4px'
  };
  const openTriggerStyle = {
    ...triggerStyle,
    background: '#3e464d',
    borderTopLeftRadius:'4px',
    borderTopRightRadius:'4px',
  };
  return (
    <Collapsible
      open={rest.open || true}
      transitionTime={150}
      transitionCloseTime={150}
      triggerStyle={open ? openTriggerStyle : triggerStyle}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={
        open ? (
          <>
            <MdExpandLess /> <TriggerLabel>{trigger} </TriggerLabel>
          </>
        ) : (
          <>
             <MdExpandMore /> <TriggerLabel>{trigger} </TriggerLabel>
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
