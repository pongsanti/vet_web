import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Divider } from 'semantic-ui-react';

const CHK_BOX_SPAN_STYLE = {marginRight: 25};

class Togglers extends Component {
  constructor (props) {
    super(props);

    this.state = {
      actives: new Set(props.items),
    }
  }

  componentWillReceiveProps (nextProps) {
    const {items} = this.props;
    if (nextProps.items !== items) {
      this.setState({
        actives: new Set(nextProps.items),
      })
    }
  }

  onChange (item, event, data) {
    const {actives} = this.state;
    const newActives = (new Set(actives));

    const _ = (data.checked) ? newActives.add(item) : newActives.delete(item);
    this.setState({
      actives : newActives,
    })

    const {onChange} = this.props;
    if (onChange) {
      onChange(newActives);
    }
  }

  onSelectAllChange (event, data) {
    const {onChange, items} = this.props;
    const newActives = (data.checked) ? new Set(items) : new Set();
    this.setState({
      actives : newActives,
    })

    if (onChange) {
      onChange(newActives);
    }
  }

  items () {
    const {actives} =  this.state;
    const {items, title_field} = this.props;
    return items.map(i => 
      <span style={CHK_BOX_SPAN_STYLE} key={i.id}>
        <Checkbox
          checked={actives.has(i)}
          fitted
          slider
          label={i[title_field]}
          onChange={this.onChange.bind(this, i)} />
      </span>
    );
  }

  render () {
    const {actives} =  this.state;
    const {items} = this.props;
    return (
      <div>
        <Checkbox
          style={CHK_BOX_SPAN_STYLE}
          checked={actives.size === items.length}
          fitted
          slider
          label='Select ALL' 
          onChange={this.onSelectAllChange.bind(this)} />
        {this.items()}
      </div>
    )
  }
}

Togglers.propTypes = {
  items: PropTypes.array.isRequired,
  title_field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default Togglers;
