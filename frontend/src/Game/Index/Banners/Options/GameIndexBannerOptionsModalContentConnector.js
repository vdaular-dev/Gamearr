import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setArtistBannerOption } from 'Store/Actions/artistIndexActions';
import GameIndexBannerOptionsModalContent from './GameIndexBannerOptionsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.artistIndex,
    (artistIndex) => {
      return artistIndex.bannerOptions;
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onChangeBannerOption(payload) {
      dispatch(setArtistBannerOption(payload));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(GameIndexBannerOptionsModalContent);
