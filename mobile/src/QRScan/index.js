/* @flow */
import { connect } from 'react-redux';

import { fetchPosterData } from '../App/reducer';
import QRScan from './presenter';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onValidPaulingQRCodeRead: (paulingUrl) => {
      dispatch(fetchPosterData(paulingUrl));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
