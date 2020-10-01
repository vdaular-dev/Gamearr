import PropTypes from 'prop-types';
import React from 'react';
import { icons, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Popover from 'Components/Tooltip/Popover';
import VirtualTableHeader from 'Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from 'Components/Table/VirtualTableHeaderCell';
import VirtualTableSelectAllHeaderCell from 'Components/Table/VirtualTableSelectAllHeaderCell';
import GameMonitoringOptionsPopoverContent from 'AddGame/GameMonitoringOptionsPopoverContent';
// import SeriesTypePopoverContent from 'AddGame/SeriesTypePopoverContent';
import styles from './ImportGameHeader.css';

function ImportGameHeader(props) {
  const {
    showMetadataProfile,
    allSelected,
    allUnselected,
    onSelectAllChange
  } = props;

  return (
    <VirtualTableHeader>
      <VirtualTableSelectAllHeaderCell
        allSelected={allSelected}
        allUnselected={allUnselected}
        onSelectAllChange={onSelectAllChange}
      />

      <VirtualTableHeaderCell
        className={styles.folder}
        name="folder"
      >
        Folder
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.monitor}
        name="monitor"
      >
        Monitor

        <Popover
          anchor={
            <Icon
              className={styles.detailsIcon}
              name={icons.INFO}
            />
          }
          title="Monitoring Options"
          body={<GameMonitoringOptionsPopoverContent />}
          position={tooltipPositions.RIGHT}
        />
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.qualityProfile}
        name="qualityProfileId"
      >
        Quality Profile
      </VirtualTableHeaderCell>

      {
        showMetadataProfile &&
          <VirtualTableHeaderCell
            className={styles.metadataProfile}
            name="metadataProfileId"
          >
            Metadata Profile
          </VirtualTableHeaderCell>
      }

      <VirtualTableHeaderCell
        className={styles.albumFolder}
        name="albumFolder"
      >
        Album Folder
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.artist}
        name="artist"
      >
        Artist
      </VirtualTableHeaderCell>
    </VirtualTableHeader>
  );
}

ImportGameHeader.propTypes = {
  showMetadataProfile: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func.isRequired
};

export default ImportGameHeader;
