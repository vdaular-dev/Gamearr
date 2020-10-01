import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createExistingArtistSelector from 'Store/Selectors/createExistingArtistSelector';
import ImportGameSearchResult from './ImportGameSearchResult';

function createMapStateToProps() {
  return createSelector(
    createExistingArtistSelector(),
    (isExistingArtist) => {
      return {
        isExistingArtist
      };
    }
  );
}

export default connect(createMapStateToProps)(ImportGameSearchResult);
