import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { queueLookupArtist, setImportGameValue } from 'Store/Actions/importArtistActions';
import createImportGameItemSelector from 'Store/Selectors/createImportGameItemSelector';
import ImportGameSelectGame from './ImportGameSelectGame';

function createMapStateToProps() {
  return createSelector(
    (state) => state.importArtist.isLookingUpArtist,
    createImportGameItemSelector(),
    (isLookingUpArtist, item) => {
      return {
        isLookingUpArtist,
        ...item
      };
    }
  );
}

const mapDispatchToProps = {
  queueLookupArtist,
  setImportGameValue
};

class ImportGameSelectGameConnector extends Component {

  //
  // Listeners

  onSearchInputChange = (term) => {
    this.props.queueLookupArtist({
      name: this.props.id,
      term,
      topOfQueue: true
    });
  }

  onArtistSelect = (foreignArtistId) => {
    const {
      id,
      items
    } = this.props;

    this.props.setImportGameValue({
      id,
      selectedArtist: _.find(items, { foreignArtistId })
    });
  }

  //
  // Render

  render() {
    return (
      <ImportGameSelectGame
        {...this.props}
        onSearchInputChange={this.onSearchInputChange}
        onArtistSelect={this.onArtistSelect}
      />
    );
  }
}

ImportGameSelectGameConnector.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  selectedArtist: PropTypes.object,
  isSelected: PropTypes.bool,
  queueLookupArtist: PropTypes.func.isRequired,
  setImportGameValue: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportGameSelectGameConnector);
