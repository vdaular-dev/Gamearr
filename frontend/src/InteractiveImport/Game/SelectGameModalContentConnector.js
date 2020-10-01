import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { updateInteractiveImportItem, saveInteractiveImportItem } from 'Store/Actions/interactiveImportActions';
import createAllArtistSelector from 'Store/Selectors/createAllArtistSelector';
import SelectGameModalContent from './SelectGameModalContent';

function createMapStateToProps() {
  return createSelector(
    createAllArtistSelector(),
    (items) => {
      return {
        items: items.sort((a, b) => {
          if (a.sortName < b.sortName) {
            return -1;
          }

          if (a.sortName > b.sortName) {
            return 1;
          }

          return 0;
        })
      };
    }
  );
}

const mapDispatchToProps = {
  updateInteractiveImportItem,
  saveInteractiveImportItem
};

class SelectGameModalContentConnector extends Component {

  //
  // Listeners

  onArtistSelect = (artistId) => {
    const artist = _.find(this.props.items, { id: artistId });

    const ids = this.props.ids;

    ids.forEach((id) => {
      this.props.updateInteractiveImportItem({
        id,
        artist,
        album: undefined,
        albumReleaseId: undefined,
        tracks: [],
        rejections: []
      });
    });

    this.props.saveInteractiveImportItem({ id: ids });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <SelectGameModalContent
        {...this.props}
        onArtistSelect={this.onArtistSelect}
      />
    );
  }
}

SelectGameModalContentConnector.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveInteractiveImportItem: PropTypes.func.isRequired,
  updateInteractiveImportItem: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SelectGameModalContentConnector);
