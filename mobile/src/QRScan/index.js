/* @flow */
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { fetchPosterData } from './reducer';
import QRScan from './presenter';


function mapStateToProps(state) {
  const scan = state.scan;
  return {
    isFetchingPosterData: scan.isFetchingPosterData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onValidPaulingQRCodeRead: (paulingUrl) => {
      dispatch(NavigationActions.back());
      dispatch(fetchPosterData(paulingUrl));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
