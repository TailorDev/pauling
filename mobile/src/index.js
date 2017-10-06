/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import 'app/ReactotronConfig.js';
import configureStore from 'app/store/configureStore';
import AppNavigator from 'app/AppNavigator';

type State = {|
  loading: boolean,
  store: any,
|};

export default class Pauling extends Component {
  state: State;

  constructor() {
    super();

    this.state = {
      loading: true,
      store: configureStore(() => this.setState({ loading: false })),
    };
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    SplashScreen.hide();

    return (
      <Root>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      </Root>
    );
  }
}
