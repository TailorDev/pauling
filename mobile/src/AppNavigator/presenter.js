/* @flow */
import React from 'react';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import AppScreen from 'app/App';
import PosterScreen from 'app/Poster';
import QRScanScreen from 'app/QRScan';
import type { Dispatch, Navigation } from 'app/types';

export const BaseAppNavigator = StackNavigator({
  App: { screen: AppScreen },
  Poster: { screen: PosterScreen },
  QRScan: { screen: QRScanScreen },
});

type Props = {|
  dispatch: Dispatch,
  navigationState: Navigation,
|};

const AppNavigator = (props: Props) =>
  <BaseAppNavigator
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.navigationState,
    })}
  />;

export default AppNavigator;
