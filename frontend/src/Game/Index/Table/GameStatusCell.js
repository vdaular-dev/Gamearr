import PropTypes from 'prop-types';
import React from 'react';
import { icons } from 'Helpers/Props';
import Icon from 'Components/Icon';
import VirtualTableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './GameStatusCell.css';

function GameStatusCell(props) {
  const {
    className,
    artistType,
    monitored,
    status,
    component: Component,
    ...otherProps
  } = props;

  const endedString = artistType === 'Person' ? 'Deceased' : 'Ended';

  return (
    <Component
      className={className}
      {...otherProps}
    >
      <Icon
        className={styles.statusIcon}
        name={monitored ? icons.MONITORED : icons.UNMONITORED}
        title={monitored ? 'Artist is monitored' : 'Artist is unmonitored'}
      />

      <Icon
        className={styles.statusIcon}
        name={status === 'ended' ? icons.ARTIST_ENDED : icons.GAME_CONTINUING}
        title={status === 'ended' ? endedString : 'Continuing'}
      />
    </Component>
  );
}

GameStatusCell.propTypes = {
  className: PropTypes.string.isRequired,
  artistType: PropTypes.string,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  component: PropTypes.elementType
};

GameStatusCell.defaultProps = {
  className: styles.status,
  component: VirtualTableRowCell
};

export default GameStatusCell;
