import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Menu, Modal, Container, Dropdown, Image, Header, Button, Icon } from 'semantic-ui-react';
import Doctor from './components/doctor';
import Vehicle from './components/vehicle';
import Appointment from './components/appointment';

import history from './history';
import {doctorGet} from './actions'

import LOGO from './assets/HTML5_Badge_256.png';

const mapStateToProps = state => {
  const {ui} = state
  return {
    load: ui.load
  }
}

class Vet extends Component {
  componentWillMount () {
    const {dispatch} = this.props;
    dispatch(doctorGet());
  }

  onMenuClick (link) {
    history.push(`/${link}`)
  }

  render () {
    const {load} = this.props;
    return (
      <div>
        <Modal open={load} size='mini'>
          <Modal.Content>
            <Container textAlign='center'>
              <span><Icon loading name='spinner' size='large' /> Loading...</span>
            </Container>
          </Modal.Content>
        </Modal>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src={LOGO}
                style={{ marginRight: '1.5em' }}
              />
              Vet Appointments
            </Menu.Item>
            <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'doctors')}><Icon name='doctor' /> Doctors</Menu.Item>
            <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'vehicles')}><Icon name='shipping' /> Vehicles</Menu.Item>
            <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'appointments')}><Icon name='calendar' /> Appointments</Menu.Item>
          </Container>
        </Menu>
        <Container style={{ marginTop: '7em' }}>
          <Route path='/doctors' component={Doctor} />
          <Route path='/vehicles' component={Vehicle} />
          <Route path='/appointments' component={Appointment} />
        </Container>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Vet));
