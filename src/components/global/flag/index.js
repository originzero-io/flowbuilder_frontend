import React from "react";
import { Triangle } from "../../style-components/Shapes";
import TagIcon from "./TagIcon";
import styled from "styled-components";
export default function Flag({ flagColor, onClick }) {
  return (
    <Triangle color={flagColor} onClick={onClick}>
      <TagIcon/>
    </Triangle>
  );
}
