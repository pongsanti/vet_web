import React, {Component} from 'react';
import { Header, Icon } from 'semantic-ui-react';

class Doctor extends Component {
  render () {
    return (
      <Header as='h1'>
        <Icon name='doctor' />
        <Header.Content>
          Doctors
        </Header.Content>
      </Header>
    )
  }
}

export default Doctor;
