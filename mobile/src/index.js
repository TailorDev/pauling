import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './App';


const store = configureStore();

export default function Mirror() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
