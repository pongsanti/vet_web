import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button } from 'semantic-ui-react';

import { vehicleGet, vehicleDelete } from '../actions'

import VehicleForm from './vehicle_form';

const mapStateToProps = state => {
  const {vehicle} = state
  return {
    vehicles: vehicle.vehicles
  }
}

class Vehicle extends Component {
  componentWillMount () {
    const {dispatch} = this.props;
    this.getVehicles();
  }

  getVehicles () {
    const {dispatch} = this.props;
    dispatch(vehicleGet());
  }

  onDeleteClick (vehicle) {
    const {dispatch} = this.props;
    dispatch(vehicleDelete(vehicle.id))
    .then(this.getVehicles.bind(this));
  }

  vehicles (vehicles) {
    return vehicles ? vehicles.map(v => (
      <Table.Row key={v.id}>
        <Table.Cell>{v.id}</Table.Cell>
        <Table.Cell>{v.type}</Table.Cell>
        <Table.Cell>{v.plate}</Table.Cell>
        <Table.Cell><Button title='Delete' icon secondary onClick={this.onDeleteClick.bind(this, v)}><Icon name='trash' /></Button></Table.Cell>
      </Table.Row>
    )) : [];
  }

  render () {
    const {vehicles} = this.props;
    return (
      <div>
        <Header as='h1'>
          <Icon name='shipping' />
          <Header.Content>Vehicles</Header.Content>
        </Header>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Table celled striped compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Plate</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.vehicles(vehicles)}
              </Table.Body>
            </Table>
            </Grid.Column>
            <Grid.Column>
              <VehicleForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>        
      </div>
    )
  }
}

export default connect(mapStateToProps)(Vehicle);
