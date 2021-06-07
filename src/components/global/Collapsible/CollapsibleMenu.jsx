import React from "react";
import Collapsible from "react-collapsible";
import { CollapsableItem, TriggerWrapper } from "./style";
import PropTypes from "prop-types";

export function CollapsibleMenu({ trigger, open, children }) {
  return (
    <Collapsible
      trigger={trigger}
      open={open || false}
      transitionTime={150}
      transitionCloseTime={150}
    >
      {children}
    </Collapsible>
  );
}
export function CollapsibleMenuItem({ children, onClick }) {
  return <CollapsableItem onClick={onClick}>{children}</CollapsableItem>;
}
export function CollapsibleTrigger({ children, label, icon }) {
  return (
    <TriggerWrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <div style={{ paddingLeft: "5px" }}>{label}</div>
      </div>
      {children}
    </TriggerWrapper>
  );
}

CollapsibleMenu.propTypes = {
  trigger: PropTypes.oneOf([PropTypes.string, PropTypes.element]).isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};
CollapsibleMenuItem.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired
};
CollapsibleTrigger.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};
