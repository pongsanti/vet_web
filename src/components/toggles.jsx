import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Dropdown } from 'semantic-ui-react';

class Toggles extends Component {

  onClick (item) {
    const {onClick} = this.props;
    if (onClick) {
      onClick(item);
    }
  }

  items () {
    const {items} = this.props;
    return items.map(i => 
      <Button toggle
        size='tiny'
        color='teal'
        compact
        onClick={this.onClick.bind(this, i)}>{i.name}</Button>
    );
  }

  render () {
    return (
      <div>
        {this.items()}
      </div>
    )
  }
}

Toggles.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default Toggles;
