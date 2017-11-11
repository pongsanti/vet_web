import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button, Card, Divider, Segment } from 'semantic-ui-react';
import BigCalendar from 'react-big-calendar';

import {vehicleAppGet, vehicleAppDelete} from '../actions';
import {parseDateToDateObject} from './date';

import VehicleAppForm from './vehicle_app_form';
import AppCard from './app_card';
import Togglers from './togglers'

const mapStateToProps = state => {
  const {vehicle_app, vehicle} = state
  return {
    apps: vehicle_app.apps,
    vehicles: vehicle.vehicles || [],
  }
}

class VehicleApp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: null,
      active_vehicle_ids: new Set(),
    }
  }

  componentWillMount () {
    const {dispatch} = this.props;
    this.getVehicleApps();
  }

  componentWillReceiveProps (nextProps) {
    const {vehicles} = this.props;
    if (nextProps.vehicles !== vehicles) {
      const active_vehicle_ids = this.vehicle_ids_set(nextProps.vehicles);
      this.setState({
        active_vehicle_ids,
      })
    }
  } 
  
  vehicle_ids_set (vehicles) {
    const ids = new Set();
    vehicles.forEach(d => ids.add(d.id));
    return ids;
  }

  getVehicleApps () {
    const {dispatch} = this.props;
    dispatch(vehicleAppGet());
  }

  buildEvent (a) {
    return {
      id: a.id,
      title: `${a.plate} (${a.type})`,
      vehicle_id: a.vehicle_id,
      start: parseDateToDateObject(a.start_at),
      start_string: a.start_at,
      end: parseDateToDateObject(a.end_at),
      end_string: a.end_at,
    };
  }

  buildEvents (apps) {
    const {active_vehicle_ids} = this.state;
    const filtered = apps.filter(a => active_vehicle_ids.has(a.vehicle_id));
    return filtered.map(this.buildEvent);
  }

  onSelectEvent (event) {
    this.setState({ selected: event });
  }

  onDeleteClick (id) {
    const {dispatch} = this.props;
    this.setState({ selected: null });

    dispatch(vehicleAppDelete(id))
    .then(this.getVehicleApps.bind(this));
  }

  eventInfo (event) {
    return (<AppCard app={event}
      meta='Vehicle details'
      onDeleteClick={this.onDeleteClick.bind(this)} />);
  }

  onTogglerChange (actives) {
    const active_vehicle_ids = this.vehicle_ids_set(actives);
    this.setState({ active_vehicle_ids });
  }

  render () {
    const {selected} = this.state;
    const {apps, vehicles} = this.props;
    const events = this.buildEvents(apps);

    return (
      <div>
        <Header as='h1'>
          <Icon name='calendar' />
          <Header.Content>
            Vehicle Appointments
          </Header.Content>
        </Header>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment size='mini' color='teal'>
                <Togglers
                  items={vehicles}
                  title_field='plate'
                  onChange={this.onTogglerChange.bind(this)} />
              </Segment>            
              <BigCalendar style={{minHeight: 700}}
                step={60}
                events={events}
                views={['month', 'week', 'work_week', 'day', 'agenda']}
                popup={true}
                defaultDate={new Date()}
                selected={selected}
                onSelectEvent={this.onSelectEvent.bind(this)}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <VehicleAppForm />
              <Divider section />
              {selected && this.eventInfo(selected)}
            </Grid.Column>
          </Grid.Row>
        </Grid>        
      </div>
    )
  }
}

export default connect(mapStateToProps)(VehicleApp);