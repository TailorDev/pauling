/* @flow */
import React from 'react';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import AppScreen from 'App';
import PosterScreen from 'Poster';
import QRScanScreen from 'QRScan';
import type { Dispatch, Navigation } from 'types';

export const BaseAppNavigator = StackNavigator({
  App: { screen: AppScreen },
  Poster: { screen: PosterScreen },
  QRScan: { screen: QRScanScreen },
});

type Props = {|
  dispatch: Dispatch,
  nav: Navigation,
|};

const AppNavigator = (props: Props) =>
  <BaseAppNavigator
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav,
    })}
  />;

export default AppNavigator;
