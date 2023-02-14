import React from "react";
import { Toaster } from "react-hot-toast";

function ToastNotification() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{ top: 50 }}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          // borderRadius: "10px",
          background: "#343a40",
          color: "#fff",
          boxShadow: '0px 0px 8px -4px rgba(255,255,255,1)',
          border: '2px solid #6c757d',
        },
      }}
    />
  );
}

export default ToastNotification;
