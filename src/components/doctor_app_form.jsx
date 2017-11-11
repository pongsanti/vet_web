import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Form, Button, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import DateTime from 'react-datetime';

import {PICKER_DATE_FORMAT, PICKER_TIME_FORMAT, serializePostData} from './date';

import {doctorGet, doctorAppPost, doctorAppGet} from '../actions';

const TIME_CONSTRAINTS = {
  hours: {
    min: 8,
    max: 15,
    step: 1
  },
  minutes: {
    step: 30,
  }
}

const mapStateToProps = state => {
  const {doctor} = state
  return {
    doctors: doctor.doctors || []
  }
}

class DoctorAppForm extends Component {
  constructor (props) {
    super(props);

    this.state = this.defaultState();
  }

  defaultState () {
    const defaultStart = moment().startOf('day').add(8, 'h');
    return {
      doctor_id: '',
      start_at: defaultStart,
      end_at: defaultStart,
    }
  }

  componentWillMount () {
    const {dispatch} = this.props;
    dispatch(doctorGet())
  }

  refreshAppointments () {
    const {dispatch} = this.props;
    dispatch(doctorAppGet());
  }

  onSubmit () {
    const {dispatch} = this.props;
    const {doctor_id, start_at, end_at} = this.state;
    if (doctor_id && start_at && end_at && (start_at < end_at)) {
      dispatch(doctorAppPost(doctor_id, {
        start_at: serializePostData(start_at),
        end_at: serializePostData(end_at),
      }))
      .then(this.refreshAppointments.bind(this));
    }
  }

  onFormChange (e, {name, value}) {
    this.setState({ [name]: value });
  }

  onStartAtChange (date) {
    this.setState({
      start_at: date,
      end_at: date.clone().add(1, 'h'),
    })
  }

  onEndAtChange (date) {
    this.setState({
      end_at: date,
    })
  } 

  doctorOptions (doctors) {
    return doctors.map(d => ({
      text: d.name,
      value: d.id,
    }));
  }

  onResetClick () {
    this.setState(this.defaultState());
  }

  render () {
    const {doctors} = this.props;
    const {doctor_id, start_at, end_at} = this.state;
    return (
      <div>
        <Header as='h3'>
          <Header.Content>
            Add Appointment
          </Header.Content>
        </Header>
        <Form onSubmit={this.onSubmit.bind(this)} size='small'>
          <Form.Field required>
            <label>Select Doctor</label>
            <Dropdown placeholder='Doctor'
              search selection options={this.doctorOptions(doctors)}
              name='doctor_id' value={doctor_id} required
              onChange={this.onFormChange.bind(this)} />
          </Form.Field>
          <Form.Field required>
            <label>Start At</label>
            <DateTime onChange={this.onStartAtChange.bind(this)}
              value={start_at} 
              dateFormat={PICKER_DATE_FORMAT}
              timeFormat={PICKER_TIME_FORMAT}
              timeConstraints={TIME_CONSTRAINTS}/>
          </Form.Field>
          <Form.Field required>
            <label>End At</label>
            <DateTime onChange={this.onEndAtChange.bind(this)}
              value={end_at} 
              dateFormat={PICKER_DATE_FORMAT}
              timeFormat={PICKER_TIME_FORMAT}
              timeConstraints={TIME_CONSTRAINTS}/>
          </Form.Field>            
          <Button primary size='small' type='submit'>Submit</Button>
          <Button size='small' type='reset' onClick={this.onResetClick.bind(this)}>Reset</Button>
        </Form>        
      </div>
    )
  }
}

export default connect(mapStateToProps)(DoctorAppForm);
