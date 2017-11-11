import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Divider } from 'semantic-ui-react';

class Toggles extends Component {
  constructor (props) {
    super(props);

    this.state = {
      actives: new Set(),
    }
  }

  onChange (item, event, data) {
    const {actives} = this.state;
    const newActives = (new Set(actives))

    const _ = (data.checked) ? newActives.add(item) : newActives.delete(item);
    this.setState({
      actives : newActives,
    })

    const {onClick} = this.props;
    if (onClick) {
      onClick(newActives);
    }
  }

  items () {
    const {actives} =  this.state;
    const {items} = this.props;
    return items.map(i => 
      <span style={{marginRight: 25}}>
        <Checkbox
          checked={actives.has(i)}
          key={i.id}
          fitted
          slider
          label={i.name}
          onChange={this.onChange.bind(this, i)} />
      </span>
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
