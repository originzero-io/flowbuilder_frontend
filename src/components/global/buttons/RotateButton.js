import React, { useState } from "react";
import htov from "../../../assets/icons/h_to_v.png";
import vtoh from "../../../assets/icons/v_to_h.png";
import styled from "styled-components";
const Button = styled.div`
  cursor: pointer;
  img {
    filter: brightness(10000%);
  }
  &:hover img {
    filter: grayscale(100%);
    //filter:hue-rotate(215deg);
  }
`;
export default function RotateButton({ align, setAlign }) {
  const rotateHandle = () => {
    if (align === "vertical") {
      setAlign("horizontal");
    } else {
      setAlign("vertical");
    }
  };
  return (
    <Button onClick={rotateHandle}>
      <img
        src={align === "vertical" ? htov : vtoh}
        width={"15vh"}
        height={"15vh"}
        draggable={false}
      ></img>
    </Button>
  );
}
