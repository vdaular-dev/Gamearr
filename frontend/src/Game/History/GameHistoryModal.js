import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import GameHistoryModalContentConnector from './GameHistoryModalContentConnector';

function GameHistoryModal(props) {
  const {
    isOpen,
    onModalClose,
    ...otherProps
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <GameHistoryModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

GameHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default GameHistoryModal;
