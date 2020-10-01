import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setImportGameValue } from 'Store/Actions/importArtistActions';
import createAllArtistSelector from 'Store/Selectors/createAllArtistSelector';
import ImportGameRow from './ImportGameRow';

function createImportGameItemSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.importArtist.items,
    (id, items) => {
      return _.find(items, { id }) || {};
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createImportGameItemSelector(),
    createAllArtistSelector(),
    (item, artist) => {
      const selectedArtist = item && item.selectedArtist;
      const isExistingArtist = !!selectedArtist && _.some(artist, { foreignArtistId: selectedArtist.foreignArtistId });

      return {
        ...item,
        isExistingArtist
      };
    }
  );
}

const mapDispatchToProps = {
  setImportGameValue
};

class ImportGameRowConnector extends Component {

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setImportGameValue({
      id: this.props.id,
      [name]: value
    });
  }

  //
  // Render

  render() {
    // Don't show the row until we have the information we require for it.

    const {
      items,
      monitor,
      albumFolder
    } = this.props;

    if (!items || !monitor || !albumFolder == null) {
      return null;
    }

    return (
      <ImportGameRow
        {...this.props}
        onInputChange={this.onInputChange}
        onArtistSelect={this.onArtistSelect}
      />
    );
  }
}

ImportGameRowConnector.propTypes = {
  rootFolderId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  monitor: PropTypes.string,
  albumFolder: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  setImportGameValue: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportGameRowConnector);
