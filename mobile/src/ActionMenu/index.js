/* @flow */
import React, { Component } from 'react';
import { Icon, Fab } from 'native-base';

import styles from './styles';
import type { State as NavigationState } from 'app/reducers/navigation';

type Props = {|
  navigation: NavigationState,
|};

class ActionMenu extends Component {
  props: Props;

  onPress = () => {
    this.props.navigation.navigate('QRScan');
  };

  render() {
    return (
      <Fab
        direction="up"
        style={styles.Fab}
        position="bottomRight"
        onPress={this.onPress}
      >
        <Icon
          name="ios-qr-scanner"
          ios="ios-qr-scanner"
          android="md-qr-scanner"
        />
      </Fab>
    );
  }
}

export default ActionMenu;
