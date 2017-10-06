/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import 'app/ReactotronConfig.js';
import configureStore from 'app/store/configureStore';
import AppNavigator from 'app/AppNavigator';

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
