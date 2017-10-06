/* @flow */
import { BaseAppNavigator } from './presenter';

const goHome = BaseAppNavigator.router.getActionForPathAndParams('App');
const initialState = BaseAppNavigator.router.getStateForAction(goHome);

export default function reducer(
  state: Object = initialState,
  action: Object = {}
) {
  const nextState = BaseAppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}
