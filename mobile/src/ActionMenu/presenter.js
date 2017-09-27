/* @flow */
import React, { Component } from 'react';
import { Button, Icon, Fab } from 'native-base';

import type { Navigation } from '../types';
import { colors } from '../settings';
import styles from './styles';


type Props = {
  navigation: Navigation,
}

type State = {
  active: boolean,
}

class ActionMenu extends Component {

  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      active: false
    };
  }

  onMenuPress = () => {
    this.setState({ active: !this.state.active })
  }

  onScanIconPress = () => {
    this.setState({ active: false }, () => {
      this.props.navigation.navigate('QRScan');
    });
  }

  render() {
    return (
      <Fab
        active={this.state.active}
        direction="up"
        style={styles.Fab}
        position="bottomRight"
        onPress={this.onMenuPress}
      >
        <Icon
          name="ios-add"
          ios="ios-add"
          android="md-add"
        />
        <Button
          style={{backgroundColor: colors.secondaryColor}}
          onPress={this.onScanIconPress}
        >
          <Icon
            name="ios-qr-scanner"
            ios="ios-qr-scanner"
            android="md-qr-scanner"
          />
        </Button>
      </Fab>
    );
  }
}

export default ActionMenu;
