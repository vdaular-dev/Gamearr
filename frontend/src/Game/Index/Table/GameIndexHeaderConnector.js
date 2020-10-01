import { connect } from 'react-redux';
import { setArtistTableOption } from 'Store/Actions/artistIndexActions';
import GameIndexHeader from './GameIndexHeader';

function createMapDispatchToProps(dispatch, props) {
  return {
    onTableOptionChange(payload) {
      dispatch(setArtistTableOption(payload));
    }
  };
}

export default connect(undefined, createMapDispatchToProps)(GameIndexHeader);
