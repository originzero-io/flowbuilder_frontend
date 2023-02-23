import React from "react";
import * as Styled from "./NavigationPanel.style";

export default function NavMenuItem({ label, icon, onClick }) {
  return (
    <Styled.NavMenuItemWrapper onClick={onClick}>
      {icon}
      <div style={{ paddingLeft: "5px", fontSize: "1.5vmin" }}>{label}</div>
    </Styled.NavMenuItemWrapper>
  );
}
