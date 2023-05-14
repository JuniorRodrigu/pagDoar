import React from 'react';
import "./modal.css";

export default function Modal({ isOpen, setModalOpen, children }) {
  const closeModal = () => {
    setModalOpen(false)
    window.location.reload()
  }

  if (isOpen) {
    return (
      <div className="BACKGROUND_STYLE" >
        <div className="MODAL_STYLE">
          <div className="CLOSE_STYLE" onClick={closeModal}>
            x
          </div>
          <div>{children}</div>
          
        </div>
        
      </div>
    )
  }

  return null
};
