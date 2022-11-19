import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onModalClick, alt, largeImage }) => {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClick();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onModalClick]);

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return createPortal(
    <Overlay onClick={onBackDropClick}>
      <ModalWindow>
        <img src={largeImage} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};
