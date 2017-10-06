/* @flow */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import 'app/ReactotronConfig.js';
import configureStore from 'app/store/configureStore';
import AppNavigator from 'app/AppNavigator';

type Props = {|
  store?: any,
|};

type State = {|
  loading: boolean,
  store: any,
|};

export default class Pauling extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: props.store ? false : true,
      store: props.store ? props.store : configureStore(
        () => this.setState({ loading: false })
      ),
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
