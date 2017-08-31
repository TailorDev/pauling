/* @flow */
import { NavigationActions } from 'react-navigation';
import Reactotron from 'reactotron-react-native';
import { BaseAppNavigator } from './presenter';

const firstAction = BaseAppNavigator.router.getActionForPathAndParams('App');

const initialState = BaseAppNavigator.router.getStateForAction(firstAction);

export default function reducer(state: Object = initialState, action: Object = {}) {
  const nextState = BaseAppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
