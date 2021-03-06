import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import configureStore from './store/configureStore';
import history from './history';
//import Vet from './vet';
import App from './app';

import 'semantic-ui-css/semantic.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datetime/css/react-datetime.css';
import './assets/vet_style.css';

const component = () => {
  var element = document.createElement('div');
  element.id = 'root';
  return element;
};
document.body.appendChild(component());

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./vet', () => { render(App); });
}