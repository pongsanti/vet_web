import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Menu, Modal, Container, Dropdown, Image, Header, Button, Icon, Segment, Divider } from 'semantic-ui-react';
import Doctor from './components/doctor';
import Vehicle from './components/vehicle';
import DoctorApp from './components/doctor_app';
import VehicleApp from './components/vehicle_app';
import {USER_EMAIL} from './helpers/user';

import history from './history';

import LOGO from './assets/HTML5_Badge_256.png';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
BigCalendar.momentLocalizer(moment);

const ROLE_ADMIN = 'ADMIN';
const ROLE_USER = 'USER';

const mapStateToProps = state => {
  const {ui} = state
  return {
    load: ui.load
  }
}

class Vet extends Component {
  constructor (props) {
    super(props)

    this.state = {
      role: null
    }
  }

  onMenuClick (link) {
    history.push(`/${link}`)
  }

  onLoginRoleClick (role) {
    this.setState({ role });
    if (role === ROLE_ADMIN) {
      history.push(`/doctors`);
    } else if (role == ROLE_USER) {
      history.push(`/doctor_apps`);
    }
  }

  render () {
    const {load} = this.props;
    const {role} = this.state;
    const role_admin = role === ROLE_ADMIN;
    return (
      <div>
        <Modal open={load} size='mini'>
          <Modal.Content>
            <Container textAlign='center'>
              <span><Icon loading name='spinner' size='large' /> Loading...</span>
            </Container>
          </Modal.Content>
        </Modal>
        {role && 
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header onClick={this.onLoginRoleClick.bind(this, null)}>
                <Image
                  size='mini'
                  src={LOGO}
                  style={{ marginRight: '1.5em' }}
                />
                Home
              </Menu.Item>
              { role_admin && <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'doctors')}><Icon name='doctor' /> Doctors</Menu.Item> }
              { role_admin && <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'vehicles')}><Icon name='shipping' /> Vehicles</Menu.Item> }
              <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'doctor_apps')}><Icon name='calendar' /> Doctor Apps</Menu.Item>
              <Menu.Item as='a' onClick={this.onMenuClick.bind(this, 'vehicle_apps')}><Icon name='calendar' /> Vehicle Apps</Menu.Item>
              
              <Menu.Menu position='right'>
                <Menu.Item className='item'>
                  <Icon name='user' />
                </Menu.Item>
                <Dropdown text={USER_EMAIL} pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item disabled>Profile</Dropdown.Item>
                    <Dropdown.Item disabled>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        }
        {role &&
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/' component={DoctorApp} />
            { role_admin && <Route path='/doctors' component={Doctor} /> }
            { role_admin && <Route path='/vehicles' component={Vehicle} /> }
            <Route path='/doctor_apps' component={DoctorApp} />
            <Route path='/vehicle_apps' component={VehicleApp} />
          </Container>
        }
        {!role &&
          <Container style={{ marginTop: '7em' }}>
            <Header as='h1'>Veterinarian POC</Header>
            <Header as='h2'>Login as:</Header>
            <Segment padded raised>
              <Button primary fluid size='massive' onClick={this.onLoginRoleClick.bind(this, ROLE_ADMIN)}>Admin</Button>
              <Divider horizontal>Or</Divider>
              <Button secondary fluid size='massive' onClick={this.onLoginRoleClick.bind(this, ROLE_USER)}>User</Button>
            </Segment>
          </Container>
        }
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Vet));
