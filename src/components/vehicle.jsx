import React, {Component} from 'react';
import { Header, Icon } from 'semantic-ui-react';

class Vehicle extends Component {
  render () {
    return (
      <Header as='h1'>
        <Icon name='shipping' />
        <Header.Content>Vehicles</Header.Content>
      </Header>
    )
  }
}

export default Vehicle;
