/* @flow */
import { connect } from 'react-redux';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';

import QRScanScreen from './presenter';
import { fetchPoster } from 'app/reducers/posters';
import type { Dispatch } from 'app/types';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onQRCodeRead: paulingUrl => {
      dispatch(NavigationActions.back());
      dispatch(fetchPoster(paulingUrl));
    },
  };
};

export default connect(null, mapDispatchToProps)(QRScanScreen);
