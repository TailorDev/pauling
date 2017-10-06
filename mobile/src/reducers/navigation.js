/* @flow */
import { BaseAppNavigator } from 'app/AppNavigator/presenter';

type State = Object;
type Action = Object;

const goHome = BaseAppNavigator.router.getActionForPathAndParams('App');
const initialState = BaseAppNavigator.router.getStateForAction(goHome);

export default function reducer(state: State = initialState, action: Action) {
  const nextState = BaseAppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
