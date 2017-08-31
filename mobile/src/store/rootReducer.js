import { combineReducers } from 'redux';

import scan from '../QRScan/reducer';
import poster from '../Poster/reducer';

export default combineReducers({
  scan,
  poster,
});
