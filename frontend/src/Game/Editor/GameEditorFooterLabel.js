import PropTypes from 'prop-types';
import React from 'react';
import { icons } from 'Helpers/Props';
import SpinnerIcon from 'Components/SpinnerIcon';
import styles from './GameEditorFooterLabel.css';

function GameEditorFooterLabel(props) {
  const {
    className,
    label,
    isSaving
  } = props;

  return (
    <div className={className}>
      {label}

      {
        isSaving &&
          <SpinnerIcon
            className={styles.savingIcon}
            name={icons.SPINNER}
            isSpinning={true}
          />
      }
    </div>
  );
}

GameEditorFooterLabel.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired
};

GameEditorFooterLabel.defaultProps = {
  className: styles.label
};

export default GameEditorFooterLabel;
