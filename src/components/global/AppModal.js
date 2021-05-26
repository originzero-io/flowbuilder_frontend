import React from "react";
import { Modal, Button, Space } from "antd";

export default function AppModal({ visible, onOk, children }) {
  return (
    <>
      <Modal
        //title="Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onOk}
        okText="Confirm"
        cancelText="Cancel"
        footer={null}
        keyboard={true}
        mask={true}
        style={{top:"25%"}}
      >
        {children}
      </Modal>
    </>
  );
}
