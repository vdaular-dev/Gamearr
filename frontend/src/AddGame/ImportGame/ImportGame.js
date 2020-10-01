import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Switch from 'Components/Router/Switch';
import ImportGameSelectFolderConnector from 'AddGame/ImportGame/SelectFolder/ImportGameSelectFolderConnector';
import ImportGameConnector from 'AddGame/ImportGame/Import/ImportGameConnector';

class ImportGame extends Component {

  //
  // Render

  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path="/add/import"
          component={ImportGameSelectFolderConnector}
        />

        <Route
          path="/add/import/:rootFolderId"
          component={ImportGameConnector}
        />
      </Switch>
    );
  }
}

export default ImportGame;
