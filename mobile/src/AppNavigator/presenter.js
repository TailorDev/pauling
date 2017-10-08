/* @flow */
import React from 'react';
import { BackHandler } from 'react-native';
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
  // $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
} from 'react-navigation';

import AppScreen from 'app/AppScreen';
import PosterScreen from 'app/PosterScreen';
import QRScanScreen from 'app/QRScan';
import type { Dispatch } from 'app/types';
import type { State as NavigationState } from 'app/reducers/navigation';

export const BaseAppNavigator = StackNavigator({
  App: { screen: AppScreen },
  Poster: { screen: PosterScreen },
  QRScan: { screen: QRScanScreen },
});

type Props = {|
  dispatch: Dispatch,
  navigationState: NavigationState,
|};

class AppNavigator extends React.Component {
  props: Props;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;

    if (navigationState.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());

    return true;
  };

  render() {
    const { dispatch, navigationState } = this.props;

    return (
      <BaseAppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default AppNavigator;
