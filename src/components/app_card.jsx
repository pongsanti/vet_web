import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import {USER_EMAIL} from '../helpers/user';

class AppCard extends Component {

  onDeleteClick (id) {
    const {onDeleteClick} = this.props;
    if (onDeleteClick) {
      onDeleteClick(id);
    }
  }

  render () {
    const {app, meta} = this.props;
    const {title, start_string, end_string, id, vehicle_id,
    creator_name, creator_tel} = app;
    return (
      <Card color='black'>
        <Card.Content header={title} meta={meta} />
        <Card.Content description={`${start_string} - ${end_string}`} />
        <Card.Content description={`Originator: ${USER_EMAIL}`} />
        { creator_name &&
          <Card.Content description={`นัดหมายกับ: ${creator_name}`} />
        }
        { creator_tel &&
          <Card.Content description={`Tel: ${creator_tel}`} />
        }
        { vehicle_id &&
          <Card.Content description={`Location: Sukhumvit Rd. (${vehicle_id})`} />
        }
        <Card.Content extra>
          <Button title='Delete' size='tiny' basic primary onClick={this.onDeleteClick.bind(this, id)}>
            Delete
          </Button>
        </Card.Content>
      </Card>
    )
  }
}

AppCard.propTypes = {
  app: PropTypes.object.isRequired,
  meta: PropTypes.string,
  onDeleteClick: PropTypes.func,
}

export default AppCard;
