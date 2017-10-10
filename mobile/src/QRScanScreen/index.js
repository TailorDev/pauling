/* @flow */
import { connect } from 'react-redux';
// $FlowFixMe: react-navigation module is explicitly ignored (see .flowconfig)
import { NavigationActions } from 'react-navigation';

import QRScanScreen from './presenter';
import { fetchPoster } from 'app/reducers/posters';
import type { Dispatch, State } from 'app/types';

const mapStateToProps = (state: State) => {
  const { loading } = state.posters;

  return {
    loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onQRCodeRead: paulingUrl => {
      dispatch(fetchPoster(paulingUrl));
      dispatch(NavigationActions.back());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScanScreen);
