import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34, 34, 34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  color: '#fff' // Adjust text color to white
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0)',
  zIndex: 1000
};

const CLOSE_BUTTON_STYLE = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  position: 'absolute',
  top: '5px',
  right: '5px',
  cursor: 'pointer'
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={CLOSE_BUTTON_STYLE} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
