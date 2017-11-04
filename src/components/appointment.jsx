import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';

import {doctorGet, doctorDelete} from '../actions';

import DoctorAppForm from './doctor_app_form';

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
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <BigCalendar style={{minHeight: 700}}
                step={60}
                events={[]}
                views={['month']}
                popup={true}
                defaultDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <DoctorAppForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>        
      </div>
    )
  }
}

export default connect(mapStateToProps)(Appointment);
