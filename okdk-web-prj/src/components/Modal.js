// Modal.js

import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <h2>Modal Content</h2>
      <p>This is the content of the modal.</p>
      <button onClick={onRequestClose}>Close Modal</button>
    </Modal>
  );
};

export default ModalComponent;
