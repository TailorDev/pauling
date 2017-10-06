/* @flow */
import { connect } from 'react-redux';

import AppNavigator from './presenter';
import type { State } from 'app/types';

const mapStateToProps = (state: State) => ({
  navigationState: state.navigation,
});

export default connect(mapStateToProps)(AppNavigator);
