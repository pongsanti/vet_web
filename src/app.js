import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Vet from './vet';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/:role' component={Vet} />
      </Switch>
    );
  }
}

export default App;