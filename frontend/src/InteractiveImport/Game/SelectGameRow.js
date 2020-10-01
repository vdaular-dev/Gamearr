import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import styles from './SelectGameRow.css';

class SelectGameRow extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onArtistSelect(this.props.id);
  }

  //
  // Render

  render() {
    return (
      <Link
        className={styles.artist}
        component="div"
        onPress={this.onPress}
      >
        {this.props.artistName}
      </Link>
    );
  }
}

SelectGameRow.propTypes = {
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  onArtistSelect: PropTypes.func.isRequired
};

export default SelectGameRow;
