import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducers/componentReducer";
import {AiFillCloseCircle} from "react-icons/ai"
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
    padding: "25px",
    background: "#1C1F26",
    minWidth: "30%",
    maxHeight: "70%",
    boxShadow: "-1px 1px 16px -9px rgba(0,0,0,0.75)",
    color: "white",
    border:"1px solid rgba(100,100,100,0.6)"

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
        <AiFillCloseCircle style={{fontSize:'3vh'}}/>
      </div>
      <div style={childrenStyle}>{modal}</div>
    </ReactModal>
  );
}