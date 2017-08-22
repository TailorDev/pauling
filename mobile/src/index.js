/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from "native-base";
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import './ReactotronConfig';
import configureStore from './store/configureStore';
import AppScreen from './App';
import PosterScreen from './Poster';
import QRScanScreen from './QRScan';

const Routes = StackNavigator({
  App: { screen: AppScreen },
  Poster: { screen: PosterScreen },
  QRScan: { screen: QRScanScreen },
});

const store = configureStore();


export default class Pauling extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Root>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Root>
    );
  }
}
