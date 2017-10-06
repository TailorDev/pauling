/* @flow */
import { combineReducers } from 'redux';

import posters from './posters';
import navigation from './navigation';

export default combineReducers({
  posters,
  navigation,
});
