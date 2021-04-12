import React from 'react'
import tagIcon from "../../../assets/icons/Tag.png";

export default function TagIcon() {
    return (
        <>
          <img
            src={tagIcon}
            alt="noimg"
            width="21px"
            height="21px"
            draggable={false}
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
            }}
          />  
        </>
    )
}
