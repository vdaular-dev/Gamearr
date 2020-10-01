import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createExistingArtistSelector from 'Store/Selectors/createExistingArtistSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import AddNewGameSearchResult from './AddNewGameSearchResult';

function createMapStateToProps() {
  return createSelector(
    createExistingArtistSelector(),
    createDimensionsSelector(),
    (isExistingArtist, dimensions) => {
      return {
        isExistingArtist,
        isSmallScreen: dimensions.isSmallScreen
      };
    }
  );
}

export default connect(createMapStateToProps)(AddNewGameSearchResult);
