import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'Components/Icon';
import styles from './GameIndexOverviewInfoRow.css';

function GameIndexOverviewInfoRow(props) {
  const {
    title,
    iconName,
    label
  } = props;

  return (
    <div
      className={styles.infoRow}
      title={title}
    >
      <Icon
        className={styles.icon}
        name={iconName}
        size={14}
      />

      {label}
    </div>
  );
}

GameIndexOverviewInfoRow.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default GameIndexOverviewInfoRow;
