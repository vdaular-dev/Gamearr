import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import ImportGameName from './ImportGameName';
import styles from './ImportGameSearchResult.css';

class ImportGameSearchResult extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onPress(this.props.foreignArtistId);
  }

  //
  // Render

  render() {
    const {
      artistName,
      disambiguation,
      // year,
      isExistingArtist
    } = this.props;

    return (
      <Link
        className={styles.artist}
        onPress={this.onPress}
      >
        <ImportGameName
          artistName={artistName}
          disambiguation={disambiguation}
          // year={year}
          isExistingArtist={isExistingArtist}
        />
      </Link>
    );
  }
}

ImportGameSearchResult.propTypes = {
  foreignArtistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  disambiguation: PropTypes.string,
  // year: PropTypes.number.isRequired,
  isExistingArtist: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ImportGameSearchResult;
