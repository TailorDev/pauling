/* @flow */
import { BaseAppNavigator } from 'app/AppNavigator/presenter';

export type State = {
  navigate: Function,
  state: {
    index: number,
    params: Object,
  },
};
type Action = Object;

const goHome = BaseAppNavigator.router.getActionForPathAndParams('App');
const initialState = BaseAppNavigator.router.getStateForAction(goHome);

export default function reducer(state: State = initialState, action: Action) {
  const nextState = BaseAppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
