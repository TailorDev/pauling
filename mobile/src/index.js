/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import './ReactotronConfig';
import configureStore from './store/configureStore';
import AppScreen from './App';
import PosterScreen from './Poster';


const Routes = StackNavigator({
  App: { screen: AppScreen },
  Poster: { screen: PosterScreen }
});

const store = configureStore();

export default class Pauling extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
