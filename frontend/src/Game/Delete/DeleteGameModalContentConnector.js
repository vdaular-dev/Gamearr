import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createArtistSelector from 'Store/Selectors/createArtistSelector';
import { deleteArtist } from 'Store/Actions/artistActions';
import DeleteGameModalContent from './DeleteGameModalContent';

function createMapStateToProps() {
  return createSelector(
    createArtistSelector(),
    (artist) => {
      return artist;
    }
  );
}

const mapDispatchToProps = {
  deleteArtist
};

class DeleteGameModalContentConnector extends Component {

  //
  // Listeners

  onDeletePress = (deleteFiles, addImportListExclusion) => {
    this.props.deleteArtist({
      id: this.props.artistId,
      deleteFiles,
      addImportListExclusion
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <DeleteGameModalContent
        {...this.props}
        onDeletePress={this.onDeletePress}
      />
    );
  }
}

DeleteGameModalContentConnector.propTypes = {
  artistId: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired,
  deleteArtist: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DeleteGameModalContentConnector);
