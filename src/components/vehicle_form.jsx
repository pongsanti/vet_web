import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Form, Button, Dropdown } from 'semantic-ui-react';

import {vehicleGet, vehiclePost} from '../actions';

const TYPE_OPTIONS = [
  { text: 'Bike', value: 'Bike' },
  { text: 'Hashback', value: 'Hashback' },
  { text: 'Sedan', value: 'Sedan' },
  { text: 'Van', value: 'Van' },
  { text: 'Truck', value: 'Truck' },
  { text: 'SUV', value: 'SUV' },
];

class VehicleForm extends Component {
  constructor (props) {
    super(props);

    this.state = this.defaultState();
  }

  defaultState () {
    return {
      type: '',
      plate: '',
    }
  }

  onSubmit () {
    const {dispatch} = this.props;
    const {type, plate} = this.state;
    if (type && plate) {
      dispatch(vehiclePost(this.state))
      .then(() => dispatch(vehicleGet()));
    }
  }

  onFormChange (e, {name, value}) {
    this.setState({ [name]: value })
  }

  onResetClick () {
    this.setState(this.defaultState());
  }

  render () {
    const {type, plate} = this.state;

    return (
      <div>
      <Header as='h3'>
        <Header.Content>
          Add vehicle
        </Header.Content>
      </Header>
      <Form onSubmit={this.onSubmit.bind(this)} size='small'>
        <Form.Field required>
          <label>Type</label>
          <Dropdown placeholder='Vehicle type'
            search selection options={TYPE_OPTIONS}
            name='type' value={type} required
            onChange={this.onFormChange.bind(this)} />
        </Form.Field>        
        <Form.Field required>
          <label>Plate</label>
          <Form.Input placeholder='Vehicle license plate' name='plate' value={plate}
            onChange={this.onFormChange.bind(this)} />
        </Form.Field>
        <Button primary size='small' type='submit'>Submit</Button>
        <Button size='small' type='reset' onClick={this.onResetClick.bind(this)}>Reset</Button>
      </Form>
    </div>
    )
  }
}

export default connect()(VehicleForm);
