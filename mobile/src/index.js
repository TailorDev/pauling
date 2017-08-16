/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import configureStore from './store/configureStore';
import AppScreen from './App';


const Routes = StackNavigator({
  App: { screen: AppScreen },
});

const store = configureStore();

export default class Pauling extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
