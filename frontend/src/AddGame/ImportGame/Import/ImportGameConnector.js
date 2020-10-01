/* eslint max-params: 0 */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setImportGameValue, importArtist, clearImportGame } from 'Store/Actions/importArtistActions';
import { fetchRootFolders } from 'Store/Actions/rootFolderActions';
import { setAddArtistDefault } from 'Store/Actions/addArtistActions';
import createRouteMatchShape from 'Helpers/Props/Shapes/createRouteMatchShape';
import ImportGame from './ImportGame';

function createMapStateToProps() {
  return createSelector(
    (state, { match }) => match,
    (state) => state.rootFolders,
    (state) => state.addArtist,
    (state) => state.importArtist,
    (state) => state.settings.qualityProfiles,
    (state) => state.settings.metadataProfiles,
    (
      match,
      rootFolders,
      addArtist,
      importArtistState,
      qualityProfiles,
      metadataProfiles
    ) => {
      const {
        isFetching: rootFoldersFetching,
        isPopulated: rootFoldersPopulated,
        error: rootFoldersError,
        items
      } = rootFolders;

      const rootFolderId = parseInt(match.params.rootFolderId);

      const result = {
        rootFolderId,
        rootFoldersFetching,
        rootFoldersPopulated,
        rootFoldersError,
        qualityProfiles: qualityProfiles.items,
        metadataProfiles: metadataProfiles.items,
        showMetadataProfile: metadataProfiles.items.length > 1,
        defaultQualityProfileId: addArtist.defaults.qualityProfileId,
        defaultMetadataProfileId: addArtist.defaults.metadataProfileId
      };

      if (items.length) {
        const rootFolder = _.find(items, { id: rootFolderId });

        return {
          ...result,
          ...rootFolder,
          items: importArtistState.items
        };
      }

      return result;
    }
  );
}

const mapDispatchToProps = {
  dispatchSetImportGameValue: setImportGameValue,
  dispatchImportGame: importArtist,
  dispatchClearImportGame: clearImportGame,
  dispatchFetchRootFolders: fetchRootFolders,
  dispatchSetAddArtistDefault: setAddArtistDefault
};

class ImportGameConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    const {
      qualityProfiles,
      metadataProfiles,
      defaultQualityProfileId,
      defaultMetadataProfileId,
      dispatchFetchRootFolders,
      dispatchSetAddArtistDefault
    } = this.props;

    if (!this.props.rootFoldersPopulated) {
      dispatchFetchRootFolders();
    }

    let setDefaults = false;
    const setDefaultPayload = {};

    if (
      !defaultQualityProfileId ||
      !qualityProfiles.some((p) => p.id === defaultQualityProfileId)
    ) {
      setDefaults = true;
      setDefaultPayload.qualityProfileId = qualityProfiles[0].id;
    }

    if (
      !defaultMetadataProfileId ||
      !metadataProfiles.some((p) => p.id === defaultMetadataProfileId)
    ) {
      setDefaults = true;
      setDefaultPayload.metadataProfileId = metadataProfiles[0].id;
    }

    if (setDefaults) {
      dispatchSetAddArtistDefault(setDefaultPayload);
    }
  }

  componentWillUnmount() {
    this.props.dispatchClearImportGame();
  }

  //
  // Listeners

  onInputChange = (ids, name, value) => {
    this.props.dispatchSetAddArtistDefault({ [name]: value });

    ids.forEach((id) => {
      this.props.dispatchSetImportGameValue({
        id,
        [name]: value
      });
    });
  }

  onImportPress = (ids) => {
    this.props.dispatchImportGame({ ids });
  }

  //
  // Render

  render() {
    return (
      <ImportGame
        {...this.props}
        onInputChange={this.onInputChange}
        onImportPress={this.onImportPress}
      />
    );
  }
}

const routeMatchShape = createRouteMatchShape({
  rootFolderId: PropTypes.string.isRequired
});

ImportGameConnector.propTypes = {
  match: routeMatchShape.isRequired,
  rootFoldersPopulated: PropTypes.bool.isRequired,
  qualityProfiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  metadataProfiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultQualityProfileId: PropTypes.number.isRequired,
  defaultMetadataProfileId: PropTypes.number.isRequired,
  dispatchSetImportGameValue: PropTypes.func.isRequired,
  dispatchImportGame: PropTypes.func.isRequired,
  dispatchClearImportGame: PropTypes.func.isRequired,
  dispatchFetchRootFolders: PropTypes.func.isRequired,
  dispatchSetAddArtistDefault: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ImportGameConnector);
