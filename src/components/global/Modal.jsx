import React from "react";
import ReactModal from "react-modal";
import { CancelIcon } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/reducers/componentReducer";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "14px",
    overflowY: "auto",
    overflowX:"hidden",
    padding: "35px",
    background: "rgb(245, 246, 250)",
    width: "30%",
    maxHeight: "70%",
    boxShadow: "-1px 1px 16px -9px rgba(0,0,0,0.75)",
  },
  overlay: {
    background: "rgba(53, 59, 72,0.4)",
    zIndex:'6'
  },
};
const closeButtonWrapperStyle = {
  position: "absolute",
  top: "0px",
  right: "1px",
  cursor: "pointer",
};
const childrenStyle = {
  marginTop: "10px",
};
ReactModal.setAppElement("#root");

export default function Modal() {
  const modal  = useSelector(state => state.modal);
  const dispatch = useDispatch();
  
  const closeModal = () => {
    dispatch(setModal(false))
  }
  return (
    <ReactModal
      isOpen={modal ? true : false}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div style={closeButtonWrapperStyle} onClick={closeModal}>
        <CancelIcon width="30px" height="30px" />
      </div>
      <div style={childrenStyle}>{modal}</div>
    </ReactModal>
  );
}