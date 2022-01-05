import React from "react";
import { Avatar as AntdAvatar } from "antd";
import { FaUserCircle } from "react-icons/fa";
export default function Avatar({ avatar,size }) {
  return (
    <AntdAvatar
      size={size || 42}
      src={`${process.env.REACT_APP_BASE_URL}/uploads/${avatar}`}
      icon={<FaUserCircle style={{ fontSize: "4vmin" }} />}
    />
  );
}
