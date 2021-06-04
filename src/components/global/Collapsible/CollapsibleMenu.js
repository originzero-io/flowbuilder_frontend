import React from "react";
import Collapsible from "react-collapsible";
import { CollapsableItem, TriggerWrapper } from "./style";
import { SetVariablesIcon } from "../../FlowEditor/Nodes/global/Icons";

export function CollapsibleMenu({ trigger, icon, open, children }) {
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
export function CollapsibleMenuItem({ children,onClick}) {
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
