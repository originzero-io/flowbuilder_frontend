import React from "react";
import { Avatar as AntdAvatar } from "antd";
import { FaUserCircle } from "react-icons/fa";
export default function Avatar({ avatar,size,...rest }) {
  return (
    <AntdAvatar
      size={size || 42}
      src={`${
        process.env.REACT_APP_HOST_ENV === 'development'
          ? process.env.REACT_APP_GATEWAY_LOCAL_URL
          : process.env.REACT_APP_GATEWAY_CLOUD_URL
      }/uploads/${avatar}`}
      icon={<FaUserCircle style={{ fontSize: "4vmin" }} />}
      {...rest}
    />
  );
}
