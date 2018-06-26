import React from 'react';
import { render as renderDOM } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContainer } from './containers/AppContainer';

function render() {
  renderDOM(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('app'),
  );
}

render();
