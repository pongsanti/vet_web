import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Form, Button, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import DateTime from 'react-datetime';

import {DATE_FORMAT, TIME_FORMAT} from './date';

import {doctorGet, doctorAppPost} from '../actions';

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
    const defaultStart = moment().startOf('hour');
    return {
      doctor_id: '',
      start_at: defaultStart,
      end_at: defaultStart,
    }
  }

  componentWillMount () {
    const {dispatch} = this.props;
    dispatch(doctorGet());
  }

  dateFormat (date) {
    return date.format('YYYY-MM-DD HH:mm:00');
  }

  onSubmit () {
    const {dispatch} = this.props;
    const {doctor_id, start_at, end_at} = this.state;
    if (doctor_id && start_at) {
      dispatch(doctorAppPost(doctor_id, {
        start_at: this.dateFormat(start_at),
        end_at: this.dateFormat(end_at),
      }));
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
              dateFormat={DATE_FORMAT}
              timeFormat={TIME_FORMAT}
              timeConstraints={TIME_CONSTRAINTS}/>
          </Form.Field>
          <Form.Field disabled>
            <label>End At</label>
            <DateTime
              value={end_at} 
              dateFormat={DATE_FORMAT}
              timeFormat={TIME_FORMAT}
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
