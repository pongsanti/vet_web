import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button, Card, Divider } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';

import {doctorAppGet, doctorAppDelete} from '../actions';
import {parseDateToDateObject} from './date';
import DoctorAppForm from './doctor_app_form';

const mapStateToProps = state => {
  const {doctor_app} = state
  return {
    apps: doctor_app.apps
  }
}

class Appointment extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: null,
    }
  }
  componentWillMount () {
    const {dispatch} = this.props;
    this.getDoctorApps();
  }

  getDoctorApps () {
    const {dispatch} = this.props;
    dispatch(doctorAppGet());
  }

  buildEvents (apps) {
    return apps.map(a => ({
      id: a.id,
      title: a.name,
      start: parseDateToDateObject(a.start_at),
      start_string: a.start_at,
      end: parseDateToDateObject(a.end_at),
      end_string: a.end_at,
    }));
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
    const {title, start_string, end_string, id} = event;
    return (
      <Card color='black'>
        <Card.Content header={title} meta='Doctor name'/>
        <Card.Content description={`${start_string} - ${end_string}`} />
        <Card.Content extra>
          <Button title='Delete' size='tiny' basic primary onClick={this.onDeleteClick.bind(this, id)}>
            Delete
          </Button>
        </Card.Content>
      </Card>
    )
  }

  render () {
    const {selected} = this.state;
    const {apps} = this.props;
    const events = this.buildEvents(apps);

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
                events={events}
                views={['month', 'week', 'work_week', 'day']}
                popup={true}
                defaultDate={new Date()}
                selected={selected}
                onSelectEvent={this.onSelectEvent.bind(this)}
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

export default connect(mapStateToProps)(Appointment);
