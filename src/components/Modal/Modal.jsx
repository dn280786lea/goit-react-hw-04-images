import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ closeModal, url }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="Modal" onClick={handleClick}>
      <img className="modalImage" src={url} alt="modal_img" />
    </div>
  );
};

export default Modal;
