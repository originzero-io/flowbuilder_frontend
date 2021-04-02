import React from "react";

export default function FavIcon(props) {
  return (
    <div
      style={{
        color: props.color,
        cursor: "default",
      }}
      onClick={props.onClick}
    >
      <i className="fas fa-star"></i>
    </div>
  );
}
