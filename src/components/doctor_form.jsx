import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Form, Button } from 'semantic-ui-react';

import {doctorPost, doctorGet} from '../actions';

class DoctorForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  onNameChange (e, {name, value}) {
    this.setState({ [name]: value })
  }

  onSubmit (formObj) {
    const {dispatch} = this.props;
    if (this.state.name) {
      dispatch(doctorPost(this.state))
      .then(() => dispatch(doctorGet()));
    }
  }

  onResetClick () {
    this.setState({
      name: ''
    })
  }

  render () {
    const {name} = this.state;

    return (
      <div>
        <Header as='h3'>
          <Header.Content>
            Add doctor
          </Header.Content>
        </Header>
        <Form onSubmit={this.onSubmit.bind(this)} size='small'>
          <Form.Field required>
            <label>Doctor Name</label>
            <Form.Input placeholder='Doctor Name' name='name' value={name}
              onChange={this.onNameChange.bind(this)} />
          </Form.Field>
          <Button primary size='small' type='submit'>Submit</Button>
          <Button size='small' type='reset' onClick={this.onResetClick.bind(this)}>Reset</Button>
        </Form>
      </div>
    )
  }
}

export default connect()(DoctorForm);