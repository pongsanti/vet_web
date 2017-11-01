import React from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import ButtonExampleButton from './button_example';

import 'semantic-ui-css/semantic.min.css';

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element; 
}
document.body.appendChild(component());

const render = Component => {
  ReactDOM.render(
    <Component/>,
    document.getElementById('root')
  );
}

render(ButtonExampleButton);