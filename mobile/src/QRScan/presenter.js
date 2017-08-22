/* @flow */
import React, { Component } from 'react';

import { View } from 'react-native';
import { Spinner, Text, Toast } from 'native-base';
import Camera from 'react-native-camera';

import { colors } from '../settings';
import Fetching from './Fetching';
import styles from './styles';
import type {
  // Navigation,
  NavigationOptions,
  // Poster as PosterType
} from '../types';

type Props = {};


class QRScan extends Component {

  props: Props;

  static navigationOptions = (): NavigationOptions => ({
    title: 'New poster',
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      hasReadValidQR: false,
    };

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  isValidPaulingUrl(url) {
    // TODO
    return true;
  }

  onBarCodeRead(data, bound) {

    const paulingUrl = data.data;

    if(this.isValidPaulingUrl(paulingUrl)) {
      this.setState({
        hasReadValidQR: true,
      });
      // TODO
      // Dispatch here
    } else {
      Toast.show({
        text: 'Invalid QR code. Please try again.',
        position: 'bottom',
        buttonText: 'Okay'
      });
    }
  }

  render() {
    return (
      <View style={styles.QRScan}>
        {
          this.state.hasReadValidQR ?
            <Fetching paulingUrl={this.state.paulingUrl} />
            :
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.Preview}
              aspect={Camera.constants.Aspect.fill}
              onBarCodeRead={this.onBarCodeRead}
              barCodeTypes={['qr']}
            >
              <Spinner color={colors.primaryColor} />
              <Text style={styles.Processing}>
                Waiting for a Pauling QR code…
              </Text>
            </Camera>
        }
      </View>
    );
  }
}

export default QRScan;
