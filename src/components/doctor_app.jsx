import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button, Card, Divider, Segment } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';

import {doctorAppGet, doctorAppDelete} from '../actions';
import {parseDateToDateObject} from './date';
import DoctorAppForm from './doctor_app_form';
import AppCard from './app_card';
import Togglers from './togglers'

const mapStateToProps = state => {
  const {doctor_app, doctor} = state
  return {
    apps: doctor_app.apps,
    doctors: doctor.doctors || [],
  }
}

class DoctorApp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: null,
      active_doctor_ids: new Set(),
    }
  }
  componentWillMount () {
    const {dispatch} = this.props;
    this.getDoctorApps();
  }

  componentWillReceiveProps (nextProps) {
    const {doctors} = this.props;
    if (nextProps.doctors !== doctors) {
      const active_doctor_ids = this.doctor_ids_set(nextProps.doctors);
      this.setState({
        active_doctor_ids,
      })
    }
  }

  doctor_ids_set (doctors) {
    const ids = new Set();
    doctors.forEach(d => ids.add(d.id));
    return ids;
  }

  getDoctorApps () {
    const {dispatch} = this.props;
    dispatch(doctorAppGet());
  }

  buildEvent (a) {
    return {
      id: a.id,
      title: a.name,
      start: parseDateToDateObject(a.start_at),
      start_string: a.start_at,
      end: parseDateToDateObject(a.end_at),
      end_string: a.end_at,
      creator_name: a.creator_name || '',
      creator_tel: a.creator_tel || '',
    };
  }

  buildEvents (apps) {
    const {active_doctor_ids} = this.state;
    const filtered = apps.filter(a => active_doctor_ids.has(a.doctor_id));
    return filtered.map(this.buildEvent);
  }

  onSelectEvent (event) {
    this.setState({ selected: event });
  }

  onDeleteClick (id) {
    const {dispatch} = this.props;
    this.setState({ selected: null });

    dispatch(doctorAppDelete(id))
    .then(this.getDoctorApps.bind(this));
  }

  eventInfo (event) {
    return (<AppCard app={event}
      meta='Doctor name'
      onDeleteClick={this.onDeleteClick.bind(this)} />);
  }

  onTogglerChange (actives) {
    const active_doctor_ids = this.doctor_ids_set(actives);
    this.setState({ active_doctor_ids });
  }

  render () {
    const {selected} = this.state;
    const {apps, doctors} = this.props;
    const events = this.buildEvents(apps);

    return (
      <div>
        <Header as='h1'>
          <Icon name='calendar' />
          <Header.Content>
            Doctor Appointments
          </Header.Content>
        </Header>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment size='mini' color='teal'>
                <Togglers
                  items={doctors}
                  title_field='name'
                  onChange={this.onTogglerChange.bind(this)} />
              </Segment>
              <BigCalendar style={{minHeight: 700}}
                step={60}
                events={events}
                views={['month', 'week', 'work_week', 'day', 'agenda']}
                popup={true}
                defaultDate={new Date()}
                onSelectEvent={this.onSelectEvent.bind(this)}
                selected={selected}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <DoctorAppForm />
              <Divider section />
              {selected && this.eventInfo(selected)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DoctorApp);
