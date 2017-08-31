/* @flow */
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigator from './presenter';

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigator);
