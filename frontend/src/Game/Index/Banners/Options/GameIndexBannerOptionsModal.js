import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import GameIndexBannerOptionsModalContentConnector from './GameIndexBannerOptionsModalContentConnector';

function GameIndexBannerOptionsModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <GameIndexBannerOptionsModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

GameIndexBannerOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default GameIndexBannerOptionsModal;
