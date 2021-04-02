import React,{useState} from "react";
import Icon from "../../global/Icon";
//import CollapseButton from "../global/CollapseButton";
import Flag from "../../global/Flag";
import { Header, Label,Divider } from "../styles";
import RotateButton from "../../global/RotateButton";
import CollapseButton from "../../global/CollapseButton";
export default function NodeHeader({ iconSrc, label, flagColor, align, setAlign, collapsable,expand,expandMenu}) {
  return (
    <div>
      <Header>
        <Icon src={iconSrc} />
        <Label>{label}</Label>
        {collapsable && <CollapseButton expandMenu={expandMenu} expand={expand}/>}
        <RotateButton align={align} setAlign={setAlign}/>
        <Flag flagColor={flagColor} />
      </Header>
      <Divider />
    </div>
  );
}
