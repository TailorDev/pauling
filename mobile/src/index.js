/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from "native-base";
import SplashScreen from 'react-native-splash-screen';

import './ReactotronConfig';
import configureStore from './store/configureStore';
import AppNavigator from './AppNavigator';

const store = configureStore();


export default class Pauling extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </Root>
    );
  }
}
