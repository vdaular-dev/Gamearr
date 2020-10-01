import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Store/Actions/baseActions';
import EditGameModal from './EditGameModal';

const mapDispatchToProps = {
  clearPendingChanges
};

class EditGameModalConnector extends Component {

  //
  // Listeners

  onModalClose = () => {
    this.props.clearPendingChanges({ section: 'artist' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditGameModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditGameModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(EditGameModalConnector);
