import { combineReducers } from 'redux';

import nav from '../AppNavigator/reducer';
import poster from '../Poster/reducer';
import scan from '../QRScan/reducer';

export default combineReducers({
  nav,
  poster,
  scan,
});
