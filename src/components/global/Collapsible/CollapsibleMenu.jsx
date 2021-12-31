/* eslint-disable react/prop-types */
import React from "react";
import Collapsible from "react-collapsible";
import { CollapsableItem, TriggerWrapper } from "./style";
import PropTypes from "prop-types";

export function CollapsibleMenu({ trigger, open, children, style, ...props }) {
  return (
    <Collapsible
      trigger={trigger}
      open={open || false}
      transitionTime={150}
      transitionCloseTime={150}
      style={style}
      {...props}
    >
      <div>{children}</div>
    </Collapsible>
  );
}
export function CollapsibleMenuItem({ children, onClick, active }) {
  return (
    <CollapsableItem active={active} onClick={onClick}>
      {children}
    </CollapsableItem>
  );
}
export function CollapsibleTrigger({ children, label, icon, onClick, style }) {
  return (
    <TriggerWrapper onClick={onClick} style={style}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <div style={{ paddingLeft: "5px" }}>{label}</div>
      </div>
      {children}
    </TriggerWrapper>
  );
}

// CollapsibleMenu.propTypes = {
//   trigger: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
//   open: PropTypes.oneOf([PropTypes.bool,PropTypes.undefined]),
//   children: PropTypes.arrayOf(PropTypes.element).isRequired
// };
// CollapsibleMenuItem.propTypes = {
//   children: PropTypes.arrayOf(PropTypes.element),
//   onClick: PropTypes.func.isRequired
// };
// CollapsibleTrigger.propTypes = {
//   children: PropTypes.element,
//   label: PropTypes.string,
//   icon: PropTypes.element
// };
