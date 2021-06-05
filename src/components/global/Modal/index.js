import React from "react";
import ReactModal from "react-modal";
import { CancelIcon } from "../Icons";
import PropTypes from "prop-types"

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "14px",
    overflow: "visible",
    padding: "35px",
    background: "rgb(245, 246, 250)",
    width: "30%",
    maxHeight: "70%",
    boxShadow: "0px 3px 18px 9px rgba(0,0,0,0.75)"

  },
  overlay: {
    background: "rgba(53, 59, 72,0.4)",
  },
};
const closeButtonWrapperStyle = {
  position: "absolute",
  top: "-8px",
  right: "-6px",
  cursor: "pointer",
};
const childrenStyle = {
  marginTop: "10px",
};
ReactModal.setAppElement("#root");

export default function Modal({ isOpen, onRequestClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div style={closeButtonWrapperStyle} onClick={onRequestClose}>
        <CancelIcon width="30px" height="30px" />
      </div>
      <div style={childrenStyle}>{children}</div>
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
