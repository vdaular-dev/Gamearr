import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import GameIndexPosterOptionsModalContentConnector from './GameIndexPosterOptionsModalContentConnector';

function GameIndexPosterOptionsModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <GameIndexPosterOptionsModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

GameIndexPosterOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default GameIndexPosterOptionsModal;
