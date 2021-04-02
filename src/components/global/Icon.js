import React from "react";
import styled from "styled-components";
export default function Icon({ src }) {
  return (
    <>
      <img
        src={src}
        width={25}
        height={25}
        draggable={false}
        style={{ filter: "hue-rotate(30deg)" }}
      />
    </>
  );
}
