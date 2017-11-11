import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Grid, Table, Button } from 'semantic-ui-react';

import {doctorGet, doctorDelete} from '../actions';

import DoctorForm from './doctor_form';
import Togglers from './togglers';

const mapStateToProps = state => {
  const {doctor} = state
  return {
    doctors: doctor.doctors
  }
}

class Doctor extends Component {
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

  doctors (doctors) {
    return doctors ? doctors.map(d => (
      <Table.Row key={d.id}>
        <Table.Cell>{d.id}</Table.Cell>
        <Table.Cell>{d.name}</Table.Cell>
        <Table.Cell><Button title='Delete' icon secondary onClick={this.onDeleteClick.bind(this, d)}><Icon name='trash' /></Button></Table.Cell>
      </Table.Row>
    )) : [];
  }

  render () {
    const {doctors} = this.props;
    return (
      <div>
        <Header as='h1'>
          <Icon name='doctor' />
          <Header.Content>
            Doctors
          </Header.Content>
        </Header>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Table celled striped compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.doctors(doctors)}
              </Table.Body>
            </Table>
            </Grid.Column>
            <Grid.Column>
              <DoctorForm/>
            </Grid.Column>
          </Grid.Row>
        </Grid>   
      </div>
    )
  }
}

export default connect(mapStateToProps)(Doctor);
