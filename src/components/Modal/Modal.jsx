import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ closeModal, url }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="Modal" onClick={handleClick}>
      <img className="modalImage" src={url} alt="modal_img" />
    </div>
  );
};

export default Modal;
