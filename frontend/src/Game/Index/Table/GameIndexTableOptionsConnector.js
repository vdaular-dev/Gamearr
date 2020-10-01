import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import GameIndexTableConnector from './GameIndexTableConnector';

function createMapStateToProps() {
  return createSelector(
    (state) => state.artistIndex.tableOptions,
    (tableOptions) => {
      return tableOptions;
    }
  );
}

export default connect(createMapStateToProps)(GameIndexTableConnector);
