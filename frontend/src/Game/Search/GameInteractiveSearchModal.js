import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import GameInteractiveSearchModalContent from './GameInteractiveSearchModalContent';

function GameInteractiveSearchModal(props) {
  const {
    isOpen,
    artistId,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      closeOnBackgroundClick={false}
      onModalClose={onModalClose}
    >
      <GameInteractiveSearchModalContent
        artistId={artistId}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

GameInteractiveSearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  artistId: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default GameInteractiveSearchModal;
