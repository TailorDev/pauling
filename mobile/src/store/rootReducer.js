import { combineReducers } from 'redux';

import app from '../App/reducer';
import posters from '../PosterCardList/reducer';

export default combineReducers({
  app,
  posters,
});
