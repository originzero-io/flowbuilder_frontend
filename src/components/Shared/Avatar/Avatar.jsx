import React from "react";
import { Avatar as AntdAvatar } from "antd";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({ avatar, size, ...rest }) {
  return (
    <AntdAvatar
      size={size || 42}
      src={`${
        import.meta.env.VITE_HOST_ENV === "development"
          ? import.meta.env.VITE_GATEWAY_LOCAL_URL
          : import.meta.env.VITE_GATEWAY_CLOUD_URL
      }/uploads/${avatar}`}
      icon={<FaUserCircle style={{ fontSize: "4vmin" }} />}
      {...rest}
    />
  );
}
