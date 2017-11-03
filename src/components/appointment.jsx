import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button } from 'semantic-ui-react';

import {doctorGet, doctorDelete} from '../actions';

const mapStateToProps = state => {
  const {doctor} = state
  return {
    doctors: doctor.doctors
  }
}

class Appointment extends Component {
  componentWillMount () {
    const {dispatch} = this.props;
    this.getDoctors();
  }

  onDeleteClick (doctor) {
    const {dispatch} = this.props;
    dispatch(doctorDelete(doctor.id))
    .then(this.getDoctors.bind(this));
  }

  getDoctors () {
    const {dispatch} = this.props;
    dispatch(doctorGet());
  }

  render () {
    return (
      <div>
        <Header as='h1'>
          <Icon name='calendar' />
          <Header.Content>
            Appointments
          </Header.Content>
        </Header>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Appointment);
