/* @flow */
import { connect } from 'react-redux';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';

import QRScan from './presenter';
import { fetchPosterData } from 'app/reducers/posters';
import type { Dispatch, State } from 'app/types';

const mapStateToProps = (state: State) => {
  return {};
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onValidPaulingQRCodeRead: paulingUrl => {
      dispatch(NavigationActions.back());
      dispatch(fetchPosterData(paulingUrl));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
